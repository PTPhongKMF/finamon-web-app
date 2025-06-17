import React, { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../shadcn/accordion"
import { m } from "../../../i18n/paraglide/messages"
import { Plus, TicketPlus, Check } from "lucide-react"
import { useAppDateStore, useAppJournalStore } from "../../../stores/appJournalStore"
import { useShallow } from "zustand/react/shallow"
import { Input } from "../../shadcn/input"
import { Textarea } from "../../shadcn/textarea"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useUserStore } from "../../../stores/userStore"
import { kyAspDotnet } from "../../../api/ky"
import { monthEnd, monthStart } from "@formkit/tempo"

export default function AddExpense() {
  const [addForm, setAddForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const user = useUserStore(state => state.user);
  const selectedMonthYear = useAppDateStore(state => state.selectedMonthYear);

  const { accordionState, setAccordionState } = useAppJournalStore(useShallow(
    state => ({
      accordionState: state.accordionState,
      setAccordionState: state.setAccordionState
    })
  ))

  const fetchCategories = useQuery({
    queryKey: ["all_category", user.id],
    queryFn: async () => {
      return await kyAspDotnet.get(`api/category/user/${user.id}`, {
        searchParams: {
          pageNumber: 1,
          pageSize: 1000
        }
      }).json();
    },
  })


  const fetchExpenses = useQuery({
    queryKey: ["getExpenses", user.id, selectedMonthYear],
    queryFn: async () => {
      return await kyAspDotnet.get(`api/expense/user/${user.id}`, {
        searchParams: {
          StartDate: monthStart(selectedMonthYear).toISOString(),
          EndDate: monthEnd(selectedMonthYear).toISOString(),
          PageNumber: 1,
          PageSize: 10,
          SortBy: "CreatedDate",
          SortDescending: true
        }
      }).json()
    }
  })

  const addExpense = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/expense", {
        json: {
          name: addForm.name,
          description: addForm.note,
          amount: addForm.amount,
          categoryId: addForm.categoryId
        }
      }).json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setAddForm({});
      setTimeout(() => {
        setIsExiting(true);
        fetchExpenses.refetch();

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
            <TicketPlus />
            {m["app.addExpense"]()}
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
              <section className="grid grid-rows-[auto_auto_auto] gap-4 px-4">
                <section className="flex gap-8">
                  <div className="flex flex-col w-full max-w-sm gap-2">
                    <label htmlFor="name">{m["common.name"]()}</label>
                    <Input type="text" id="name" placeholder={m["common.name"]()}
                      value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
                  </div>

                  <div className="flex flex-col w-full max-w-sm gap-2">
                    <label htmlFor="amount">{m["common.amount"]()}</label>
                    <Input type="number" step="0.01" min="0" id="amount" placeholder={m["common.amount"]()}
                      value={addForm.amount} onChange={(e) => setAddForm({ ...addForm, amount: e.target.value })} />
                  </div>

                  <div className="flex flex-col w-full max-w-sm gap-2">
                    <label>{m["app.category"]()}</label>
                    {fetchCategories.isPending ? (
                      <div className="flex justify-center items-center gap-1 h-full">
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
                      </div>
                    ) : fetchCategories.isSuccess && (
                      <Select
                        value={addForm.categoryId}
                        onValueChange={(value) => setAddForm({ ...addForm, categoryId: value })}>
                        <SelectTrigger className="shadow-xs cursor-pointer">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-40 w-fit overflow-y-auto scroll-smooth">
                          {fetchCategories.data.items.map(category => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className="cursor-pointer"
                            >
                              <div className="flex gap-2 items-center">
                                <div className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </section>

                <div className="grid w-full items-center gap-2">
                  <label htmlFor="amount">{m["common.note"]()}</label>
                  <Textarea placeholder={m["common.enterNoteHere"]()}
                    value={addForm.note} onChange={(e) => setAddForm({ ...addForm, note: e.target.value })} />
                </div>
              </section>

              <div className="flex gap-2">
                <p className="grow max-h-10 text-red-500 font-bold over overflow-y-auto">
                  {addExpense.isError ? addExpense.error.message : ""}
                </p>

                <button
                  onClick={addExpense.mutate}
                  disabled={!addForm.name || !addForm.amount || !addForm.note || addExpense.isPending}
                  className={clsx("w-50 h-10 shrink-0 rounded-md p-1 flex items-center justify-center justify-self-end",
                    (addForm.name && addForm.amount && addForm.note) ? "bg-gradient-to-r from-amber-600 to-yellow-400 cursor-pointer hover:brightness-90"
                      : "bg-gray-300 cursor-not-allowed"
                  )}>
                  <Plus />
                </button>
              </div>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
