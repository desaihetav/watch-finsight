import { createContext, useContext, useState } from "react";
import { fakeAuthLogin, fakeAuthSignup } from "../api/fakeAuth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const loginUserWithCredentials = async (username, password) => {
    try {
      const { success, data: user } = await fakeAuthLogin(username, password);
      if (success) {
        setUser(user);
        localStorage?.setItem("authUser", JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUserWithCredentials = async (name, username, password) => {
    try {
      const { success, data: user } = await fakeAuthSignup(
        name,
        username,
        password
      );
      if (success) {
        setUser(user);
        localStorage?.setItem("authUser", JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (username, password) => {
    localStorage?.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        createUserWithCredentials,
        loginUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
