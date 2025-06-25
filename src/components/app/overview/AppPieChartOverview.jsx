import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../shadcn/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card";
import { Link } from "react-router-dom";
import { MoveRight, NotebookText } from "lucide-react";
import { m } from "../../../i18n/paraglide/messages";
import { formatVND } from "../../../utils/formatter";

export default function AppPieChartOverview({ chartConfig, chartData, totalExpense }) {

  return (
    <Card className="grid grid-cols-[auto_fr] grid-rows-[auto_auto_auto_auto] bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
      <Link to="/app/journal"
        className="col-span-full items-center justify-center p-2 text-lg flex gap-2 rounded-md hover:bg-yellow-50 hover:text-blue-500">
        <NotebookText />
        {m["app.toExpenseDetails"]()}
        <MoveRight />
      </Link>

      {(chartConfig && chartData) ? (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[15rem]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="min-w-[10rem] [&_.text-muted-foreground]:mr-3"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="spent"
              nameKey="categoryName"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && typeof viewBox.cx === "number" && typeof viewBox.cy === "number") {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-sx font-bold"
                        >
                          {formatVND(totalExpense)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          {m["common.spent"]()}
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      ) : (
        <div className="flex justify-center items-center space-x-1 min-h-50">
          <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="size-4 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      )}

      <p className="justify-self-center text-2xl font-semibold mt-8 mb-4">
        {m["app.expenseChartCurrentMonth"]()}
      </p>

    </Card>
  )
}
