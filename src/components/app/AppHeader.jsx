import { Card } from "../../components/shadcn/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/shadcn/select";
import { CalendarDays, ChevronDown, HandCoins, NotebookText } from "lucide-react";
import { useLocation } from "react-router-dom";
import { m } from "../../i18n/paraglide/messages";
import { useAppDateStore } from "../../stores/appJournalStore";
import { useShallow } from "zustand/react/shallow";

import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { format } from "@formkit/tempo";
import MonthYearPicker from "./MonthYearPicker";

export default function AppHeader() {
  const { pathname } = useLocation();

  const { selectedMonthYear, setSelectedMonthYear } = useAppDateStore(useShallow(
    state => ({
      selectedMonthYear: state.selectedMonthYear,
      setSelectedMonthYear: state.setSelectedMonthYear
    })
  ))

  return (
    <section className="col-2">
      <Card className="bg-linear-to-b from-green-400 to-green-600 grid grid-cols-3 items-center text-2xl font-bold text-gray-100 p-2 gap-20">

        {pathname === "/app" && (<>
          <HandCoins className="size-12" />
          <p>{m["app.overview"]()}</p>
        </>)}
        {pathname === "/app/journal" && (<>
          <NotebookText className="size-12" />
          <p>{m["app.expenses"]()}</p>
        </>)}

        <Popover>
          <PopoverTrigger className="w-full max-w-80">
            <div className="text-black cursor-pointer flex gap-10 w-full px-5 min-h-8 text-2xl font-bold bg-white/20 border-amber-200 border-2 rounded-md items-center justify-center">
              <div className="flex gap-2 items-center">
                <CalendarDays />
                {format(selectedMonthYear, "MM-YYYY")}
              </div>

              <ChevronDown className="justify-self-end" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0"
            onCloseAutoFocus={() => console.log("closed!")}>
            <MonthYearPicker 
              selectedDate={selectedMonthYear} 
              onSelect={(date) => {
                setSelectedMonthYear(date);
              }} 
            />
          </PopoverContent>
        </Popover>
      </Card>
    </section>
  )
}


