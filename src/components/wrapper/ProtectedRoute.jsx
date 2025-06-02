import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

function ProtectedRoute(props) {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.roles);
    if (user) {
      const isAllowed = props.allowedRoles.some(role =>
        user.roles.some(userRole => userRole === role)
      );
      if (!isAllowed) navigate("/login")
    } else {
      navigate("/login")
    }
  }, [user, navigate, props.allowedRoles])

  return <Outlet/>;
}

export default ProtectedRoute;