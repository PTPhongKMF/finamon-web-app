import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../shadcn/accordion'
import { m } from '../../../i18n/paraglide/messages'
import { Plus, TicketPlus } from 'lucide-react'
import { useAppJournalCategoryStore } from '../../../stores/useAppJournal'
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
                <TicketPlus />
                {m['app.addCategory']()}
              </section>
            </AccordionTrigger>
            <AccordionContent>
    
              <section className="grid grid-rows-[auto_auto_auto] gap-4 px-4">
                <section className="flex gap-8">
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <label htmlFor="name">{m['common.name']()}</label>
                    <Input type="text" id="name" placeholder={m['common.name']()} 
                    value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <label htmlFor="amount">{m['common.amount']()}</label>
                    <Input type="number" step="0.01" min="0" id="amount" placeholder={m['common.amount']()} 
                    value={addForm.amount} onChange={(e) => setAddForm({ ...addForm, amount: e.target.value })} />
                  </div>
                </section>
    
                <div className="grid w-full items-center gap-2">
                  <label htmlFor="amount">{m['common.note']()}</label>
                  <Textarea placeholder={m['common.enterNoteHere']()} 
                  value={addForm.note} onChange={(e) => setAddForm({ ...addForm, note: e.target.value })} />
                </div>
              </section>
    
              <button
                className={clsx("w-50 h-10 rounded-md p-1 flex items-center justify-center justify-self-end",
                  (addForm.name && addForm.amount && addForm.note) ? "bg-gradient-to-r from-amber-600 to-yellow-400 cursor-pointer hover:brightness-90"
                    : "bg-gray-300 cursor-not-allowed"
                )}>
                <Plus />
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
  )
}
