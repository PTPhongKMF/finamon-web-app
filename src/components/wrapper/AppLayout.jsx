import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";

function AppLayout() {
   return (
      <div className="grid grid-cols-[13rem_1fr] h-100 mt-2 pt-8 gap-4">

         <LeftSideBar />

         <Outlet />

      </div>
   );
}

export default AppLayout;