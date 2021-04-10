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
    }
  };

  const createUserWithCredentials = async (name, email, password) => {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const user = findUserByUsername(username);
    //     if (user) {
    //       reject({ success: false, status: 401 });
    //     } else {
    //       const newUser = { name, username, password };
    //       setUser(newUser);
    //       setAllUsers((allUsers) => [...allUsers, newUser]);
    //       localStorage?.setItem("authUser", JSON.stringify(user));
    //       resolve({ success: true, status: 200, data: user });
    //       return newUser;
    //     }
    //   }, 1500);
    // });
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
