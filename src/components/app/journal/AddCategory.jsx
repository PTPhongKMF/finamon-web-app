import React, { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../shadcn/accordion"
import { m } from "../../../i18n/paraglide/messages"
import { ChartColumnStacked, Plus, Check } from "lucide-react"
import { useAppJournalCategoryStore } from "../../../stores/appJournalStore"
import { useShallow } from "zustand/react/shallow"
import { Input } from "../../shadcn/input"
import clsx from "clsx"
import { useMutation, useQuery } from "@tanstack/react-query"
import { kyAspDotnet } from "../../../api/ky"
import { useUserStore } from "../../../stores/userStore"

export default function AddCategory() {
  const [addForm, setAddForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const user = useUserStore(state => state.user);

  const { accordionState, setAccordionState } = useAppJournalCategoryStore(useShallow(
    state => ({
      accordionState: state.accordionState,
      setAccordionState: state.setAccordionState
    })
  ))

  const fetchCategories = useQuery({
    queryKey: ["all_category", user.id]
  })

  const addCategory = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/category", {
        json: {
          name: addForm.name,
          color: addForm.color,
          userId: user.id
        }
      }).json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setAddForm({});
      setTimeout(() => {
        setIsExiting(true);
        fetchCategories.refetch();

        setTimeout(() => {
          setShowSuccess(false);
          setIsExiting(false);
        }, 300);
      }, 1200);
    }
  })

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4"
      defaultValue={accordionState}
      onValueChange={(val) => setAccordionState(val)}
    >
      <AccordionItem value="open">
        <AccordionTrigger className="text-base">
          <section className="flex gap-2">
            <ChartColumnStacked />
            {m["app.addCategory"]()}
          </section>
        </AccordionTrigger>
        <AccordionContent>
          {showSuccess ? (
            <div className={clsx(
              "flex items-center justify-center p-8",
              "transition-all duration-300",
              isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100",
              "animate-in fade-in zoom-in duration-300"
            )}>
              <div className="rounded-full bg-green-100 p-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
          ) : (
            <>
              <section className="flex flex-col gap-4 px-4">
                <div className="flex flex-col w-fit gap-2">
                  <label htmlFor="cateName">{m["common.name"]()}</label>
                  <Input type="text" id="cateName" placeholder={m["common.name"]()}
                    value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
                </div>

                <div className="flex flex-col w-fit items-center gap-2">
                  <label htmlFor="color">{m["common.color"]()}</label>
                  <Input id="color" type="color" value={addForm.color || "#000000"} onChange={(e) => setAddForm({ ...addForm, color: e.target.value })}
                  />
                </div>
              </section>

              <button onClick={addCategory.mutate}
                disabled={addCategory.isPending || !addForm.name || !addForm.color}
                className={clsx("w-50 h-10 rounded-md p-1 mt-6 mb-4 flex items-center justify-center justify-self-end disabled:cursor-not-allowed disabled:bg-gray-300",
                  (addForm.name && addForm.color && !addCategory.isPending) && "bg-gradient-to-r from-green-400 to-emerald-600 cursor-pointer hover:brightness-90"
                )}>
                <Plus />
              </button>

              {addCategory.isError && (
                <p className="text-red-500">
                  {addCategory.error.message}
                </p>
              )}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
