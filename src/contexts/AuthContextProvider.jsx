import { useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthContextProvider(props) {
  const [user, setUser] = useState();

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