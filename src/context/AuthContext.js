import { createContext, useContext, useState } from "react";
import { fakeAuth } from "../api/fakeAuth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const loginWithCredentials = async (username, password) => {
    try {
      const { success, data: user } = await fakeAuth(username, password);
      if (success) {
        setUser(user);
        localStorage?.setItem("authUser", JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};
