import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavBar() {
  const { pathname } = useLocation();

  useEffect(() => {

  }, []);

  return (
    <header className="w-full bg-white shadow px-6 py-3 sticky top-0 z-50 bg-linear-to-b from-[#90EE90] to-[#E6FFE6]">
      <div className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <h1 className="text-4xl font-bold text-yellow-400 hover:text-yellow-500 ml-20">
            <Link to="/">Finamon</Link>
          </h1>
        </div>

        <nav className="justify-self-center flex justify-center gap-10 text-gray-600 font-semibold text-lg">
          <Link
            to="/"
            className={`${pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
          >
            Giới Thiệu
          </Link>
          <Link
            to="/pricings"
            className={`${pathname === "/pricings" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
          >
            Giá Cả
          </Link>
          <Link
            to="/features"
            className={`${pathname === "/features" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
          >
            Tính Năng
          </Link>
          <Link
            to="/blogs"
            className={`${pathname === "/blogs" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
          >
            Tin Tức
          </Link>
        </nav>

        <div className="flex justify-self-end">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mx-4" />
          <Link
            to="/app"
            className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
          >
            Đến sổ quản lí
          </Link>
        </div>
      </div>
    </header>
  );
}

export default TopNavBar;