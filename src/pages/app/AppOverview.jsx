import AppOveviewReport from "../../components/app/overview/AppOveviewReport";
import AppPieChartOverview from "../../components/app/overview/AppPieChartOverview";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { monthEnd, monthStart, parse } from "@formkit/tempo";
import { kyAspDotnet } from "../../api/ky";
import { useUserStore } from "../../stores/userStore";
import { useAppDateStore } from "../../stores/appJournalStore";

function AppOverview() {
  const user = useUserStore(state => state.user);
  const selectedMonthYear = useAppDateStore(state => state.selectedMonthYear);

  const fetchCategories = useQuery({
    queryKey: ["all_category", user.id],
    queryFn: async () => {
      return await kyAspDotnet.get(`api/category/user/${user.id}`, {
        searchParams: {
          pageNumber: 1,
          pageSize: 1000
        }
      }).json();
    }
  })

  const chartConfig = useMemo(() => {
    if (fetchCategories.isSuccess && fetchCategories?.data?.items) {
      return fetchCategories.data.items.reduce((acc, category) => {
        acc[category.name] = {
          label: category.name,
          color: category.color,
        };
        return acc;
      }, {});
    }
  }, [fetchCategories.data?.items, fetchCategories.isSuccess])

  const chartData = useMemo(() => {
    if (fetchCategories.isSuccess && fetchCategories?.data?.items) {
      const startDate = monthStart(selectedMonthYear);
      const endDate = monthEnd(selectedMonthYear);

      return fetchCategories.data.items.map(category => {
        const spent = category.expenses.reduce((total, expense) => {
          const expenseDate = parse(expense.date);
          if (expenseDate >= startDate && expenseDate <= endDate) {
            return total + expense.amount;
          }
          return total;
        }, 0);

        return {
          categoryName: category.name,
          spent,
          fill: category.color
        };
      }).filter(item => item.spent > 0);
    }
    return [];
  }, [fetchCategories?.data?.items, fetchCategories.isSuccess, selectedMonthYear])

  const totalExpense = useMemo(() => {
    if (!chartData) return 0;
    return chartData.reduce((total, item) => total + item.spent, 0);
  }, [chartData])

  return (
    <article className="w-full grid auto-rows-auto gap-2 animate-in fade-in">

      <div className="w-full grid grid-cols-2 items-start gap-2">
        <AppPieChartOverview chartConfig={chartConfig} chartData={chartData} totalExpense={totalExpense} />
        <AppOveviewReport chartData={chartData} />
      </div>

    </article>
  );
}

export default AppOverview;