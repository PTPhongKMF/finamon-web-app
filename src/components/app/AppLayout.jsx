import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import AppHeader from "../app/AppHeader";

function AppLayout() {

   
   return (
      <div className="grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] p-2 gap-2 bg-linear-to-br from-green-100 to-yellow-100">

         <LeftSideBar />

         <AppHeader />

         <Outlet />

      </div>
   );
}

export default AppLayout;