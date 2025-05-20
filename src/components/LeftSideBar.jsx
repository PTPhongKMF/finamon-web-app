import { ChevronFirst } from "lucide-react";
import { Link } from "react-router-dom";

function LeftSideBar() {
  return (
    <nav className="w-full border-r-2 rounded-r border-gray-400 bg-red-500 flex flex-col gap-4 px-4 py-2">
      <ChevronFirst className="mb-2"/>

      <Link className="text-lg font-bold">
      Tổng Quan
      </Link>
      <Link>Tổng Quan 2</Link>
      <Link>Tổng Quan 3</Link>
      <Link>Tổng Quan 4</Link>
    </nav>
  );
}

export default LeftSideBar;