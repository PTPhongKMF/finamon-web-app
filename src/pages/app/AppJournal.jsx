import React from 'react'
import { Card } from '../../components/shadcn/ui/card'
import JournalTable from '../../components/app/JournalTable'
import { expenseList } from './testExpenseList'

export default function AppJournal() {
  return (
    <article className="w-full grid auto-rows-auto gap-2 animate-in fade-in">

      <Card className="p-4 bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
        

        <JournalTable data={expenseList}/>
      </Card>

    </article>
  )
}
