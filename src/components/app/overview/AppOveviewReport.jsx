import { m } from "../../../i18n/paraglide/messages";
import { Card } from "../../shadcn/ui/card";

export default function AppOveviewReport() {

  return (
    <Card className="flex flex-col gap-2 bg-neutral-100 border-t-8 border-x-2 border-yellow-400">
      <p className="text-xl font-semibold ps-4 pt-2">{m["app.expenseReport"]() + " : "}</p>

      <div className="flex justify-center items-center bg-gray-200 w-full h-full rounded-lg">
        <p className="italic">{m["common.empty"]()}</p>
      </div>
    </Card>
  )
}
