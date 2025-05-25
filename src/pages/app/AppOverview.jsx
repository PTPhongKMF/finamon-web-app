import { useEffect, useMemo, useState } from "react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../components/shadcn/ui/chart";
// import { useQuery } from "@tanstack/react-query";
import { categories, items } from "./testData";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/shadcn/select";


function AppOverview() {
  const [chartConfig, setChartConfig] = useState();
  const [chartData, setChartData] = useState();
  const [dateList, setDateList] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalExpense = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.cost, 0)
  }, [])

  // const _fetchCategories = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     new Promise(resolve => setTimeout(resolve, 2000));
  //     return 1;
  //   }
  // })

  // const _fetchExpenses = useQuery({
  //   queryKey: ["expense"],
  //   queryFn: async () => {
  //     new Promise(resolve => setTimeout(resolve, 2000));
  //     return 1;
  //   }
  // })

  useEffect(() => {
    const config = categories.reduce((acc, category) => {
      acc[category.name] = {
        label: category.name,
        color: category.color,
      };
      return acc;
    }, {});

    const data = Object.values(items.reduce((acc, item) => {
      const { category, cost } = item;

      if (acc[category]) {
        acc[category].cost += cost;
      } else {
        acc[category] = {
          name: category,
          cost: cost,
          fill: `var(--color-${category})`
        };
      }
      return acc;
    }, {}))

    setChartConfig(config);
    console.log(data);
    setChartData(data);
  }, [])

  return (
    <article className="w-full grid auto-rows-auto gap-2">

      <section>
        <Card className="bg-linear-to-b from-green-400 to-green-600">
          <CardHeader>
            <CardTitle className="flex items-center text-4xl font-bold text-gray-100 gap-20">
              <p>Tổng Quan Chi Tiêu</p>
              <Select defaultValue="4-2025">
                <SelectTrigger className="max-w-[20rem] min-h-13 text-4xl font-bold">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-green-200">
                  <SelectItem value="2-2025">2-2025</SelectItem>
                  <SelectItem value="3-2025">3-2025</SelectItem>
                  <SelectItem value="4-2025">4-2025</SelectItem>
                  <SelectItem value="5-2025">5-2025</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section>
        <Card className="bg-neutral-50 border-t-8 border-x-2 border-yellow-400">
          <CardContent>
            {(chartConfig && chartData) && (
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[30rem]">
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
          </CardContent>
        </Card>
      </section>

    </article>
  );
}

export default AppOverview;