import { Outlet } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";

function AppLayout() {
   return (
      <div className="grid grid-cols-[13rem_1fr] h-100 mt-2">

         <LeftSideBar />

         <main className="w-full bg-blue-500 pl-4">
            <Outlet />
         </main>

      </div>
   );
}

export default AppLayout;