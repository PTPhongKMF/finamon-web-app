import { Link, useLocation } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useUserStore } from "../stores/userStore";
import I18nSelector from "./I18nSelector";
import { m } from "../i18n/paraglide/messages";

function TopNavBar() {
  const { pathname } = useLocation();
  const user = useUserStore(state => state.user);

  const isAppRoute = pathname.startsWith("/app");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isStaffDbRoute = pathname.startsWith("/dashboard/staff");
  const isAdminDbRoute = pathname.startsWith("/dashboard/admin");

  if (isDashboardRoute) {
    return (
      <header className="w-full bg-white shadow px-6 py-2">

        <div className="grid grid-cols-2">
          <h1 className="text-4xl font-bold">
            {isStaffDbRoute && (
              <p>Staff Dashboard</p>
            )}
            {isAdminDbRoute && (
              <p>Admin Dashboard</p>
            )}
          </h1>

          <div className="flex gap-4 justify-end">
            {(user?.roles?.some(role => role === "Staff") && isDashboardRoute && !isStaffDbRoute) && (
              <Link to="/dashboard/staff"
                className="px-4 py-2 mx-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
              >
                Staff Dashboard
              </Link>
            )}

            {(user?.roles?.some(role => role === "Admin") && isDashboardRoute && !isAdminDbRoute) && (
              <Link to="/dashboard/admin"
                className="px-4 py-2 mx-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
              >
                Admin Dashboard
              </Link>
            )}

            {user && (
              <UserAvatar />
            )}
          </div>
        </div>


      </header>
    )
  } else {
    return (
      <header className={"w-full bg-white shadow px-6 py-2 sticky top-0 z-50 border-b-4 border-yellow-400"}>

        <div
          className={`z-[-1] absolute inset-0 bg-cover bg-[url('/images/navbar_bg.jpg')] transition-opacity duration-700 ease-in-out ${isAppRoute ? "opacity-100" : "opacity-0"
            }`}
        />
        <div
          className={`z-[-1] absolute inset-0 bg-cover bg-[url('/images/navbar_bg.svg')] transition-opacity duration-700 ease-in-out ${isAppRoute ? "opacity-0" : "opacity-100"
            }`}
        />

        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-center pe-30">
            <h1 className="text-4xl font-bold text-amber-400 hover:text-yellow-500 flex items-center gap-2">
              <img src="/logo/finamon.svg" alt="Finamon Logo" width="45" height="45" />
              <Link to="/">Finamon</Link>
            </h1>
          </div>

          {(isAppRoute || isDashboardRoute) ? (
            <div></div>
          ) : (
            <nav className="justify-self-center flex justify-center gap-10 text-gray-600 font-semibold text-lg">
              <Link to="/"
                className={`${pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                {m["common.topnavbar.home"]()}
              </Link>
              <Link to="/pricings"
                className={`${pathname === "/pricings" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                {m["common.topnavbar.pricing"]()}
              </Link>
              <Link to="/features"
                className={`${pathname === "/features" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                {m["common.topnavbar.feature"]()}
              </Link>
              <Link to="/blogs"
                className={`${pathname === "/blogs" ? "text-blue-600 border-b-2 border-blue-600" : ""} hover:text-blue-600`}
              >
                {m["common.topnavbar.blog"]()}
              </Link>
            </nav>
          )}


          <div className="flex justify-self-end items-center gap-2">
            {user ? (
              <>
                <UserAvatar />

                <I18nSelector />
              </>
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200 inline-block"
                >
                  {m["common.topnavbar.login/register"]()}
                </Link>

                <I18nSelector />
              </>
            )}
          </div>
        </div >

      </header >
    );
  }
}

export default TopNavBar;