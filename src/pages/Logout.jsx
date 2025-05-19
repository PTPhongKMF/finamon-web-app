import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    Cookies.remove("token");

    navigate("/");
  })

  return ( 
    <></>
   );
}

export default Logout;