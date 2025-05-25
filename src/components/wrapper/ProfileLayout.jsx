import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import { useAuth } from "../../contexts/AuthContext";

function ProfileLayout() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col py-4 px-16 gap-8 bg-linear-to-br from-yellow-50 to-green-50">

      <div className="flex gap-4 items-center">
        <img src={user.image} alt="User Avatar" className="size-16 rounded-full object-cover border-2 border-gray-200 mx-4" />
        <p className="font-bold text-4xl">{user.name}</p>
      </div>

      <div className="grid grid-cols-[13rem_1fr] gap-8">
        <LeftSideBar />

        <Outlet />
      </div>


    </div>
  );
}

export default ProfileLayout;