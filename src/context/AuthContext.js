import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const loginUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { user, success, message },
      } = await axios.post("https://watch-finsight.desaihetav.repl.co/login", {
        email,
        password,
      });
      if (success) {
        setUser(user);
        localStorage?.setItem("authUser", JSON.stringify(user));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
      return { message: error.message, success: false };
    }
  };

  const createUserWithCredentials = async (name, email, password) => {
    try {
      const {
        data: { user, success, message },
      } = await axios.post("https://watch-finsight.desaihetav.repl.co/signup", {
        name,
        email,
        password,
      });
      if (success) {
        setUser(user);
        localStorage?.setItem("authUser", JSON.stringify(user));
      }
      return { user, message, success };
    } catch (error) {
      console.log(error);
      return { message: error.message, success: false };
    }
  };

  const updateAccountDetails = async (id, name, email, password) => {
    const response = await axios.post(
      "https://watch-finsight.desaihetav.repl.co/account",
      {
        id,
        name,
        email,
        password,
      }
    );
    console.log(response);
    if (response.data.success) {
      setUser(response.data.user);
      localStorage?.setItem("authUser", JSON.stringify(response.data.user));
    }
  };

  const logout = async () => {
    localStorage?.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        createUserWithCredentials,
        loginUserWithCredentials,
        updateAccountDetails,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
