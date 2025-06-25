import { ChartNoAxesCombined } from "lucide-react";
import { m } from "../../../i18n/paraglide/messages";
import { Card } from "../../shadcn/ui/card"
import CategoryPieChart from "./CategoryPieChart"
import { useEffect } from "react";



export default function CategoryOverview({ chartConfig, chartData }) {
  // const Arr = [1,2,3,4,5,6]

  useEffect(() => {
    console.log("chartConfig: " + JSON.stringify(chartConfig, null, 2));
    console.log("chartData: " + JSON.stringify(chartData, null, 2));
  }, [chartConfig, chartData])

  return (
    <Card className="flex flex-col gap-2 p-2 bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
      <p className="flex justify-start items-end gap-8 text-3xl font-bold col-span-3 mt-2 mb-6 ms-2">
        {m["app.categoryChart6MonthsOfEachCategory"]()}
        <ChartNoAxesCombined className="size-[1.5em] pb-1" />
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
        {chartConfig.map((config, index) =>
          <CategoryPieChart key={index} chartConfig={config} chartData={chartData[Object.keys(config)[0]]} />
        )}
      </div>

    </Card>
  )
}
