import { useUserStore } from "../stores/userStore";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./shadcn/hovercard";
import { useEffect } from "react";
import { m } from "../i18n/paraglide/messages";

function UserAvatar() {
  const user = useUserStore(state => state.user);

  useEffect(() => {
    console.log(user);
    
  })

  return (
    <HoverCard openDelay={0} closeDelay={50}>
      <HoverCardTrigger>
        <img src={user.image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mx-4" />
      </HoverCardTrigger>

      <HoverCardContent className="w-full p-0 bg-white/90">
        <nav className="flex flex-col rounded-md gap-2 p-1 text-sm text-black">

          <Link to="/profile" className="block p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-green-300 w-full">{m["common.topnavbar.account"]()}</Link>

          <Link to="/app" className="block p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-yellow-300 w-full">{m["common.topnavbar.expenseBook"]()}</Link>

          {user.roles.some(role => role === "Staff") && (
          <Link to="/dashboard/staff" className="block p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-green-300 w-full">Staff Dashboard</Link>
          )}

          {user.roles.some(role => role === "Admin") && (
          <Link to="/dashboard/admin" className="block p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-green-300 w-full">Admin Dashboard</Link>
          )}

          <Link to="/logout" className="block font-bold rounded-md p-2 border-2 border-transparent hover:border-2 hover:border-red-300 w-full">{m["common.topnavbar.logout"]()}</Link>

        </nav>
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserAvatar;