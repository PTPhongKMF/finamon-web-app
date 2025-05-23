import { ChevronFirst } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function LeftSideBar() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/app")) {
    return (
      <nav className="w-full rounded-md flex flex-col gap-4 px-4 py-2 shadow-sm bg-neutral-50">
        <ChevronFirst className="mb-2" />

        <Link className={`text-lg pb-1 border-b-3 ${pathname.endsWith("app") ? "border-transparent" : "border-blue-600"}`}>
          Tổng Quan
        </Link>
        <Link>Tổng Quan 2</Link>
        <Link>Tổng Quan 3</Link>
        <Link>Tổng Quan 4</Link>
      </nav>
    );
  } else if (pathname.startsWith("/dashboard/staff")) {
    return (
      <nav className="w-full rounded-md flex flex-col gap-4 px-4 py-2 bg-neutral-50">
        <Link
          to={"/dashboard/staff"}
          className={`text-lg pb-1 border-b-3 ${pathname === "/dashboard/staff" ? "border-blue-600" : "border-transparent"}`}>
          Tổng Quan
        </Link>

        <Link
          to={"/dashboard/staff/blogs"}
          className={`text-lg pb-1 border-b-3 ${pathname === "/dashboard/staff/blogs" ? "border-blue-600" : "border-transparent"}`}>
          Tin tức / Blog
        </Link>
      </nav>
    );
  }
}

export default LeftSideBar;