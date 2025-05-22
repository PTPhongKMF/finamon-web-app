import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const isAllowed = props.allowedRoles.some(role =>
        user.roles.some(userRole => userRole.roleName === role)
      );
      if (!isAllowed) navigate("/login")
    } else {
      navigate("/login")
    }
  }, [user, navigate, props.allowedRoles])

  return <Outlet/>;
}

export default ProtectedRoute;