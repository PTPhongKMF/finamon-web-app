import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";

function AppLayout() {
   return (
      <div className="grid grid-cols-[13rem_1fr] p-8 gap-4 bg-linear-to-br from-green-100 to-yellow-100">

         <LeftSideBar />

         <Outlet />

      </div>
   );
}

export default AppLayout;