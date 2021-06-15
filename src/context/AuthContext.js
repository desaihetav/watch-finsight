import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );

  if (token) {
    console.log("token set");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.data.message === "Invalid Token"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  const loginUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { user, token, success, message },
      } = await axios.post("https://watch-finsight.desaihetav.repl.co/login", {
        email,
        password,
      });
      if (success) {
        console.log(token);
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
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
        data: { user, token, success, message },
      } = await axios.post("https://watch-finsight.desaihetav.repl.co/signup", {
        name,
        email,
        password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage?.setItem("authUser", JSON.stringify(user));
        localStorage?.setItem("authToken", JSON.stringify(token));
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
    setUser(null);
    setToken(null);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("authUser");
    localStorage?.removeItem("authToken");
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
