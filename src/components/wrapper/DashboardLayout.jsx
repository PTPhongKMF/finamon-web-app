import { Outlet, useLocation } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";

function DashboardLayout() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/dashboard/staff")) {
    return (
      <div className="grid grid-cols-[13rem_1fr] p-4 gap-4">

        <LeftSideBar />

        <Outlet />

      </div>
    );
  } else if (pathname.startsWith("/dashboard/admin")) {
    return (
      <>
      </>
    )
  }
}

export default DashboardLayout;