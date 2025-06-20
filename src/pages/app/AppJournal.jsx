import { Card } from "../../components/shadcn/ui/card"
import JournalTable from "../../components/app/journal/JournalTable"
import AddExpense from "../../components/app/journal/AddExpense"
import AddCategory from "../../components/app/journal/AddCategory"
import CategoryList from "../../components/app/journal/CategoryList"

export default function AppJournal() {

  return (
      <article className="w-full grid grid-cols-[4fr_1fr] gap-2 animate-in fade-in">

        <section className="grid grid-rows-[auto_1fr] gap-2">
          <Card className="bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
            <AddExpense />
          </Card>

          <Card className="p-4 bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
            <JournalTable />
          </Card>
        </section>

        <section className="grid grid-rows-[auto_1fr] gap-2">
          <Card className="bg-neutral-50 border-t-8 border-x-2 border-green-400">
            <AddCategory />
          </Card>

          <Card className="p-4 bg-neutral-50 border-t-8 border-x-2 border-green-400">
            <CategoryList />
          </Card>
        </section>

      </article>
  )
}
