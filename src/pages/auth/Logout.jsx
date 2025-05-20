import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    navigate("/");
  }, [setUser, navigate]);

  return (
    <></>
  );
}

export default Logout;