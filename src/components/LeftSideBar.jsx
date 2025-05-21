import { ChevronFirst } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function LeftSideBar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full rounded-md flex flex-col gap-4 px-4 py-2 shadow-sm">
      <ChevronFirst className="mb-2" />

      <Link className={`text-lg pb-1 border-b-3 ${pathname.endsWith("app") ? "border-transparent" : "border-blue-600"}`}>
        Tổng Quan
      </Link>
      <Link>Tổng Quan 2</Link>
      <Link>Tổng Quan 3</Link>
      <Link>Tổng Quan 4</Link>
    </nav>
  );
}

export default LeftSideBar;