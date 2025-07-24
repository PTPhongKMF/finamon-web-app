import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

function ProtectedRoute(props) {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isAllowed = props.allowedRoles.some(role =>
      user.roles?.some(userRole => userRole === role)
    );
    
    if (!isAllowed) {
      navigate("/login");
    }
  }, [user, navigate, props.allowedRoles]);

  // Don't render anything if user is not authenticated
  if (!user) return null;

  return <Outlet/>;
}

export default ProtectedRoute;