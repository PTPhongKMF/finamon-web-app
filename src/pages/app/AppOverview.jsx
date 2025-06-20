import AppOveviewReport from "../../components/app/overview/AppOveviewReport";
import AppPieChartOverview from "../../components/app/overview/AppPieChartOverview";


function AppOverview() {

  return (
    <article className="w-full grid auto-rows-auto gap-2 animate-in fade-in">

      <div className="w-full grid grid-cols-2 gap-2">
        <AppPieChartOverview />
        <AppOveviewReport />
      </div>

    </article>
  );
}

export default AppOverview;