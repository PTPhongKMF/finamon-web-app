import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { categories, items } from "./testData";
import AppPieChartOverview from "../../components/app/AppPieChartOverview";


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
    <article className="w-full grid auto-rows-auto gap-2 animate-in fade-in">

      <AppPieChartOverview chartConfig={chartConfig} chartData={chartData} totalExpense={totalExpense} />

    </article>
  );
}

export default AppOverview;