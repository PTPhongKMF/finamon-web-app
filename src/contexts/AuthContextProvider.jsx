import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

function AuthContextProvider(props) {
  const [user, setUser] = useState(() => {
    // Kiểm tra localStorage khi khởi tạo
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

useEffect(() => {
  if (!user) return;

  const token = Cookies.get("token");
  if (token) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("token");
  }
}, [user])

  const values = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;