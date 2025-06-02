import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

function Logout() {
  const setUser = useUserStore(state => state.setUser);
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