import { ChevronFirst } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function LeftSideBar() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/app")) {
    return (
      <nav className="w-full rounded-md flex flex-col gap-2 p-4 shadow-sm bg-neutral-50">
        <ChevronFirst className="mb-2" />

        <Link className={`text-lg rounded-r-md py-1 px-2 border-l-4 ${pathname.endsWith("app") ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          Tổng Quan
        </Link>
        <Link>Tổng Quan 2</Link>
        <Link>Tổng Quan 3</Link>
        <Link>Tổng Quan 4</Link>
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
      <nav className="w-full rounded-md flex flex-col gap-1 p-4 bg-neutral-50">
        <Link
          to={"/profile"}
          className={`text-lg rounded-r-md py-1 px-2 border-l-4 ${pathname === "/profile" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          Thông tin cá nhân
        </Link>

        <Link
          to={"/"}
          className={`text-lg rounded-r-md py-1 px-2 border-l-4 ${pathname === "/profile/password" ? "border-blue-600 bg-gray-100" : "border-transparent"}`}>
          Mật khẩu
        </Link>
      </nav>
    )
  }
}

export default LeftSideBar;