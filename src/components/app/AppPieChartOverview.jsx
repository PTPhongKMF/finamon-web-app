import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../components/shadcn/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { Link } from "react-router-dom";
import { MoveRight, NotebookText } from "lucide-react";
import { m } from "../../i18n/paraglide/messages";

export default function AppPieChartOverview({ chartConfig, chartData, totalExpense }) {

  return (
    <Card className="grid grid-cols-[auto_fr] grid-rows-[auto_auto_auto_auto] bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
      <Link to="/app/journal"
        className="col-span-full items-center justify-center p-2 text-lg flex gap-2 rounded-md hover:bg-yellow-50 hover:text-blue-500">
        <NotebookText />
        {m["app.toExpenseDetails"]()}
        <MoveRight />
      </Link>

      {(chartConfig && chartData) && (
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
              dataKey="cost"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && typeof viewBox.cx === 'number' && typeof viewBox.cy === 'number') {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpense.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          spent
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
      )}
    </Card>
  )
}
