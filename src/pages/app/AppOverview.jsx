import AppOveviewReport from "../../components/app/overview/AppOveviewReport";
import AppPieChartOverview from "../../components/app/overview/AppPieChartOverview";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { monthEnd, monthStart, parse, format } from "@formkit/tempo";
import { kyAspDotnet } from "../../api/ky";
import { useUserStore } from "../../stores/userStore";
import { useAppDateStore } from "../../stores/appJournalStore";
import CategoryOverview from "../../components/app/overview/CategoryOverview";

function AppOverview() {
  const user = useUserStore(state => state.user);
  const selectedMonthYear = useAppDateStore(state => state.selectedMonthYear);

  const fetchCategories = useQuery({
    queryKey: ["all_category", user?.id],
    queryFn: async () => {
      if (!user?.id) return { items: [] };
      return await kyAspDotnet.get(`api/category/user/${user.id}`, {
        searchParams: {
          pageNumber: 1,
          pageSize: 1000
        }
      }).json();
    },
    enabled: !!user?.id // Only run query if user.id exists
  })

  const appPieChartConfig = useMemo(() => {
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

  const appPieChartData = useMemo(() => {
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

  const appPieTotalExpense = useMemo(() => {
    if (!appPieChartData) return 0;
    return appPieChartData.reduce((total, item) => total + item.spent, 0);
  }, [appPieChartData])

  const categoryOverviewChartConfig = useMemo(() => {
    if (fetchCategories.isSuccess && fetchCategories?.data?.items) {
      return fetchCategories.data.items.map(category => ({
        [category.name]: {
          label: category.name,
          color: category.color,
        }
      }));
    }
    return [];
  }, [fetchCategories.data?.items, fetchCategories.isSuccess])

  const categoryOverviewChartData = useMemo(() => {
    if (!fetchCategories.isSuccess || !fetchCategories?.data?.items) return {};

    // Get start and end dates
    const endDate = monthEnd(selectedMonthYear);
    const startDate = monthStart(selectedMonthYear);
    startDate.setMonth(startDate.getMonth() - 5); // -5 because we want current month + 5 previous = 6 total

    // Generate array of all month-years in the range
    const allMonthYears = [];
    const tempDate = new Date(startDate);
    while (tempDate <= endDate) {
      allMonthYears.push(format(tempDate, "MM-YYYY"));
      tempDate.setMonth(tempDate.getMonth() + 1);
    }

    return fetchCategories.data.items.reduce((acc, category) => {
      // Filter expenses within date range
      const relevantExpenses = category.expenses.filter(expense => {
        const expenseDate = parse(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });

      // Initialize with all months having zero amount
      const baseMonthlyData = allMonthYears.reduce((monthBase, monthYear) => {
        monthBase[monthYear] = {
          monthYear,
          sumAmount: 0
        };
        return monthBase;
      }, {});

      // Add up expenses for months that have them
      relevantExpenses.forEach(expense => {
        const expenseDate = parse(expense.date);
        const monthYear = format(expenseDate, "MM-YYYY");
        baseMonthlyData[monthYear].sumAmount += expense.amount;
      });

      // Convert to array and sort by month-year
      acc[category.name] = Object.values(baseMonthlyData)
        .sort((a, b) => {
          const dateA = parse(a.monthYear, "MM-YYYY");
          const dateB = parse(b.monthYear, "MM-YYYY");
          return dateA - dateB;
        });

      return acc;
    }, {});
  }, [fetchCategories.data?.items, fetchCategories.isSuccess, selectedMonthYear])

  return (
    <article className="w-full grid auto-rows-auto gap-2 animate-in fade-in">

      <div className="w-full grid grid-cols-2 items-start gap-2">
        <AppPieChartOverview chartConfig={appPieChartConfig} chartData={appPieChartData} totalExpense={appPieTotalExpense} />
        <AppOveviewReport chartData={appPieChartData} />
      </div>

      <CategoryOverview chartConfig={categoryOverviewChartConfig} chartData={categoryOverviewChartData} />

    </article>
  );
}

export default AppOverview;