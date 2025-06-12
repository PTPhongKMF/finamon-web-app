import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../shadcn/accordion'
import { m } from '../../../i18n/paraglide/messages'
import { ChartColumnStacked, Plus } from 'lucide-react'
import { useAppJournalCategoryStore } from '../../../stores/appJournalStore'
import { useShallow } from 'zustand/react/shallow'
import { Input } from '../../shadcn/input'
import { Textarea } from '../../shadcn/textarea'
import clsx from 'clsx'

export default function AddCategory() {
  const [addForm, setAddForm] = useState({});

  const { accordionState, setAccordionState } = useAppJournalCategoryStore(useShallow(
    state => ({
      accordionState: state.accordionState,
      setAccordionState: state.setAccordionState
    })
  ))

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
            {m['app.addCategory']()}
          </section>
        </AccordionTrigger>
        <AccordionContent>

          <section className="flex flex-col gap-4 px-4">
            <div className="flex flex-col w-fit gap-2">
              <label htmlFor="cateName">{m['common.name']()}</label>
              <Input type="text" id="cateName" placeholder={m['common.name']()}
                value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
            </div>

            <div className="flex flex-col w-fit items-center gap-2">
              <label htmlFor="color">{m['common.color']()}</label>
              <Input id="color" type="color" value={addForm.color} onChange={(e) => setAddForm({ ...addForm, color: e.target.value })}
                 />
            </div>
          </section>

          <button onClick={() => console.log(addForm)}
            className={clsx("w-50 h-10 rounded-md p-1 mt-6 flex items-center justify-center justify-self-end",
              (addForm.name && addForm.color) ? "bg-gradient-to-r from-green-400 to-emerald-600 cursor-pointer hover:brightness-90"
                : "bg-gray-300 cursor-not-allowed"
            )}>
            <Plus />
          </button>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
