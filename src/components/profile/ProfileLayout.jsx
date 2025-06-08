import { Link, Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import { useUserStore } from "../../stores/userStore";
import { m } from "../../i18n/paraglide/messages";
import { ArrowRight } from "lucide-react";

function ProfileLayout() {
  const user = useUserStore(state => state.user);

  return (
    <div className="flex flex-col py-4 px-10 gap-8 bg-linear-to-br from-yellow-50 to-green-50">

      <section className="grid grid-cols-2">
        <div className="flex gap-4 items-center">
          <img src={user.image} alt="User Avatar" className="size-16 rounded-full object-cover border-2 border-gray-200 mx-4" />
          <p className="font-bold text-4xl">{user.name}</p>
        </div>

        <Link to="/app"
          className="flex gap-2 justify-self-end self-center px-4 py-2 mx-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-200"
        >
          {m["common.topnavbar.toExpenseManagement"]()}
          <ArrowRight />
        </Link>
      </section>


      <div className="grid grid-cols-[15rem_1fr] gap-6">
        <LeftSideBar />

        <Outlet />
      </div>


    </div>
  );
}

export default ProfileLayout;