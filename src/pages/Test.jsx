import DatePicker from "react-datepicker";
import { DayPicker } from "react-day-picker";

export default function Test() {
  return (
    <div className="p-10 flex flex-col gap-30 w-full h-full items-center justify-end">

      <input type="month" />

      <DayPicker
        mode="single"
      />

    </div>
  )
}
