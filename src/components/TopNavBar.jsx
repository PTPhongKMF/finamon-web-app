import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./shadcn/hovercard";

function TopNavBar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isAppRoute = pathname.startsWith("/app");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isStaffDbRoute = pathname.startsWith("/dashboard/staff");
  const isAdminDbRoute = pathname.startsWith("/dashboard/admin");

  if (isAppRoute) {
    return (
      <header className={`w-full bg-white shadow px-6 py-2 sticky top-0 z-50 border-b-4 border-yellow-400`}>

        <div
          className={`z-[-1] absolute inset-0 bg-cover bg-[url('/images/navbar_bg.jpg')] transition-opacity duration-700 ease-in-out ${isAppRoute ? "opacity-100" : "opacity-0"
            }`}
        />
        <div
          className={`z-[-1] absolute inset-0 bg-cover bg-[url('/images/navbar_bg.svg')] transition-opacity duration-700 ease-in-out ${isAppRoute ? "opacity-0" : "opacity-100"
            }`}
        />

        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <h1 className="text-4xl font-bold text-amber-400 hover:text-yellow-500 ml-20 flex items-center gap-2">
              {isAppRoute ? (
                <>
                  <img src="/logo/finamon.svg" alt="Finamon Logo" width="45" height="45" />
                  Sổ Chi Tiêu
                </>
              ) : (
                <>
                  <img src="/logo/finamon.svg" alt="Finamon Logo" width="45" height="45" />
                  <Link to="/">Finamon</Link>
                </>
              )}
            </h1>
          </div>

          {(isAppRoute || isDashboardRoute) ? (
            <div></div>
          ) : (
            <nav className="justify-self-center flex justify-center gap-10 text-gray-600 font-semibold text-lg">
              <Link to="/"
                className={`${pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                Giới Thiệu
              </Link>
              <Link to="/pricings"
                className={`${pathname === "/pricings" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                Giá Cả
              </Link>
              <Link to="/features"
                className={`${pathname === "/features" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                Tính Năng
              </Link>
              <Link to="/blogs"
                className={`${pathname === "/blogs" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                Tin Tức
              </Link>
            </nav>
          )}


          <div className="flex justify-self-end gap-2">
            {user ? (
              <>
                <HoverCard openDelay={0} closeDelay={50}>
                  <HoverCardTrigger>
                    <img src={user.image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mx-4" />
                  </HoverCardTrigger>

                  <HoverCardContent>
                    <nav className="flex flex-col rounded-md gap-2 p-2 text-sm text-gray-700 bg-[url(/images/navbar_bg.svg)] bg-cover">
                      <Link to="" className="block p-2 border-b-2 border-transparent hover:border-b-2 hover:border-green-300 w-full">Tài Khoản</Link>
                      <Link to="/logout" className="block rounded-md p-2 border-2 border-transparent hover:border-2 hover:border-red-300 w-full">Đăng Xuất</Link>
                    </nav>
                  </HoverCardContent>
                </HoverCard>

                {!isDashboardRoute && (
                  isAppRoute ? (
                    <Link to="/"
                      className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
                    >
                      Thoát sổ quản lí
                    </Link>
                  ) : (
                    <Link to="/app"
                      className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
                    >
                      Đến sổ quản lí
                    </Link>
                  )
                )}
              </>
            ) : (
              <Link to="/login"
                className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
              >
                Đăng kí  / Đăng nhập
              </Link>
            )}
          </div>
        </div >

      </header >
    );
  } else {
    return (
      <header className="w-full bg-white shadow px-6 py-2">

        <div className="grid grid-cols-2">
          <h1 className="text-4xl font-bold">
            {isStaffDbRoute ? (
              <p>Staff Dashboard</p>
            ) : (
              <p>Admin Dashboard</p>
            )}
          </h1>

          <div className="flex gap-4 justify-end">
            {(user?.roles?.some(role => role === "Staff") && !isStaffDbRoute) && (
              <Link to="/dashboard/staff"
                className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
              >
                Staff Dashboard
              </Link>
            )}

            {(user?.roles?.some(role => role === "Admin") && !isAdminDbRoute) && (
              <Link to="/dashboard/admin"
                className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
              >
                Admin Dashboard
              </Link>
            )}

            {user && (
              <HoverCard openDelay={0} closeDelay={50}>
                <HoverCardTrigger>
                  <img src={user.image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mx-4" />
                </HoverCardTrigger>

                <HoverCardContent>
                  <nav className="flex flex-col rounded-md gap-2 p-2 text-sm text-gray-700 bg-[url(/images/navbar_bg.svg)] bg-cover">
                    <Link to="" className="block p-2 border-b-2 border-transparent hover:border-b-2 hover:border-green-300 w-full">Tài Khoản</Link>
                    <Link to="/logout" className="block rounded-md p-2 border-2 border-transparent hover:border-2 hover:border-red-300 w-full">Đăng Xuất</Link>
                  </nav>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>


      </header>
    )
  }
}

export default TopNavBar;