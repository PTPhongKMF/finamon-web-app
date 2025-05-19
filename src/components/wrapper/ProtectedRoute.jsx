import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("private route run")
    const token = Cookies.get("token");

    if (user && token) {

      const isAllowed = props.allowedRoles.some(role => user.roles.includes(role));
      if (!isAllowed) navigate("/login")
    } else {
      navigate("/login")
    }
  }, [user, navigate, props.allowedRoles])

  return props.children;
}

export default ProtectedRoute;