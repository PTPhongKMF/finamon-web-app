import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/shadcn/select";
import { HandCoins } from "lucide-react";

export default function AppHeader() {
  return (
    <section className="col-2 ">
      <Card className="bg-linear-to-b from-green-400 to-green-600 grid grid-cols-3 items-center text-2xl font-bold text-gray-100 p-2 gap-20">
        <HandCoins className="size-12" />
        <p>Tổng Quan Chi Tiêu</p>
        <Select defaultValue="4-2025">
          <SelectTrigger className="max-w-[20rem] min-h-8 text-3xl font-bold border-amber-400 border-3">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="bg-green-200">
            <SelectItem value="2-2025">2-2025</SelectItem>
            <SelectItem value="3-2025">3-2025</SelectItem>
            <SelectItem value="4-2025">4-2025</SelectItem>
            <SelectItem value="5-2025">5-2025</SelectItem>
          </SelectContent>
        </Select>
      </Card>
    </section>
  )
}
