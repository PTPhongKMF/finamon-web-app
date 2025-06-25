import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../shadcn/ui/chart"
import { shortenNumber } from "../../../utils/formatter"
import { m } from "../../../i18n/paraglide/messages"

export default function CategoryPieChart({ chartConfig, chartData }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {m["app.category"]() + ": "}
          <span className="ms-2 text-xl font-semibold">{Object.keys(chartConfig)[0]}</span>
        </CardTitle>
        <CardDescription>
          {chartData[0].monthYear + " " +
            m["common.to"]() + " " +
            chartData[chartData.length - 1].monthYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 50,
              right: 50,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthYear"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 2)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="sumAmount"
              name="Amount"
              type="linear"
              stroke={chartConfig[Object.keys(chartConfig)[0]].color}
              strokeWidth={2}
              dot={{
                fill: chartConfig[Object.keys(chartConfig)[0]].color,
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                formatter={(value) => shortenNumber(value)}
                position="top"
                offset={12}
                className="fill-foreground text-[0.75rem]"
              // fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
