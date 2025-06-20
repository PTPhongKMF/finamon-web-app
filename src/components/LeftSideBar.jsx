import clsx from "clsx";
import { BanknoteArrowUp, DoorClosedLocked, HandCoins, Info, NotebookText, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { m } from "../i18n/paraglide/messages";

function LeftSideBar() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/app")) {
    return (
      <nav className="w-full h-full rounded-md flex flex-col gap-4 px-2 py-8 shadow-sm bg-neutral-50/80 row-2">
        <Link to="/app"
          className={clsx("flex gap-2 rounded-r-md transition-all",
            pathname.endsWith("app") ? "border-blue-600 bg-white py-1 px-2 border-l-4 font-semibold" : "border-transparent")}>
          <HandCoins />
          {m["app.overview"]()}
        </Link>
        <Link to="/app/journal"
          className={clsx("flex gap-2 rounded-r-md transition-all",
            pathname.endsWith("journal") ? "border-blue-600 bg-white py-1 px-2 border-l-4 font-semibold" : "border-transparent")}>
          <NotebookText />
          {m["app.expenses"]()}
        </Link>
        {/* <Link to="/app/budget"
          className={clsx("flex gap-2 rounded-r-md transition-all",
            pathname.endsWith("budget") ? "border-blue-600 bg-white py-1 px-2 border-l-4 font-semibold" : "border-transparent")}>
          <ShieldAlert />
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {m["app.budgetLimit"]()}
          </span>
        </Link> */}
      </nav>
    );
  } else if (pathname.startsWith("/dashboard/staff")) {
    return (
      <nav className="w-full rounded-md flex flex-col gap-1 p-4">
        <Link
          to={"/dashboard/staff"}
          className={`text-lg rounded-r-md py-1 px-2 border-l-4 ${pathname === "/dashboard/staff" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          Tổng Quan
        </Link>

        <Link
          to={"/dashboard/staff/blogs"}
          className={`text-lg rounded-r-md py-1 px-2 border-l-4 ${pathname === "/dashboard/staff/blogs" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          Tin tức / Blog
        </Link>
      </nav>
    );
  } else if (pathname.startsWith("/profile")) {
    return (
      <nav className="w-full rounded-md flex flex-col gap-1 px-2 py-4 bg-neutral-50">
        <Link
          to="/profile"
          className={`flex gap-2 items-center rounded-r-md py-1 px-2 border-l-4 ${pathname === "/profile" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          <Info className="size-4" />
          {m["profile.personalInfo"]()}
        </Link>

        <Link
          to="/profile/security"
          className={`flex gap-2 items-center rounded-r-md py-1 px-2 border-l-4 ${pathname === "/profile/security" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          <DoorClosedLocked className="size-4" />
          {m["profile.security"]()}
        </Link>

        <Link
          to="/profile/subscription"
          className={`flex gap-2 items-center rounded-r-md py-1 px-2 border-l-4 ${pathname === "/profile/subscription" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          <BanknoteArrowUp className="size-4" />
          {m["profile.subscription"]()}
        </Link>
      </nav>
    )
  }
}

export default LeftSideBar;