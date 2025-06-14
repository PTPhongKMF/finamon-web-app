import { monthStart } from "@formkit/tempo";
import clsx from "clsx";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select";
import { m } from "../../i18n/paraglide/messages";

export default function MonthYearPicker({ selectedDate, onSelect }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const months = Array.from({ length: 12 }, (_, i) => i);
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  const handleSelect = (month) => {
    // Don't allow future dates
    if (selectedYear === currentYear && month > currentMonth) {
      return;
    }

    const newDate = monthStart(new Date(selectedYear, month, 1));
    onSelect(newDate);
  };

  const handleTodayClick = () => {
    const todayDate = new Date();
    setSelectedYear(todayDate.getFullYear());
    onSelect(monthStart(todayDate));
  };

  return (
    <div className="p-3">
      <div className="flex justify-between mb-4 items-center gap-4">
        <div className="flex items-center gap-4">
          <h4 className="font-medium">{m["app.selectYear"]()}</h4>
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-20 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-y-auto [scrollbar-gutter:stable] scroll-smooth">
              {years.map(year => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="cursor-pointer"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button
          onClick={handleTodayClick}
          className="px-3 py-1 text-sm border rounded-md bg-amber-300 hover:bg-amber-400 cursor-pointer"
        >
          {m["common.today"]()}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {months.map((month) => {
          const isDisabled = selectedYear === currentYear && month > currentMonth;
          const isSelected = selectedDate.getMonth() === month && selectedDate.getFullYear() === selectedYear;

          return (
            <button
              key={month}
              onClick={() => handleSelect(month)}
              disabled={isDisabled}
              className={clsx(
                "p-2 rounded text-center cursor-pointer",
                isDisabled && "opacity-50 cursor-not-allowed",
                isSelected && "bg-green-500 text-white",
                !isDisabled && !isSelected && "hover:bg-green-100"
              )}
            >
              {month + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}