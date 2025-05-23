import { useEffect, useMemo, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/shadcn/ui/chart";
// import { useQuery } from "@tanstack/react-query";
import { categories, items } from "./testData";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { format } from "@formkit/tempo";
import { SquareChevronDown } from "lucide-react";


function AppOverview() {
  const [chartConfig, setChartConfig] = useState();
  const [chartData, setChartData] = useState();
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
    <article className="w-full grid grid-rows-[auto_auto] gap-2">

      <section>
        <Card className="bg-linear-to-b from-green-400 to-green-600">
          <CardHeader>
            <CardTitle className="flex text-4xl font-bold text-gray-100 gap-20">
              <p>Tổng Quan Chi Tiêu</p>
              <p className="text-6xl flex gap-8">
                {format(selectedDate, "M, YYYY")}
                <button><SquareChevronDown className="size-13 text-yellow-200 hover:text-yellow-400" /></button>
              </p>
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section>
        <Card className="bg-gray-50">
          <CardContent>
            {(chartConfig && chartData) && (
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[20rem]">
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