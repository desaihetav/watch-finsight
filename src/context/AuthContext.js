import { createContext, useContext, useState } from "react";
import { fakeAuthLogin, fakeAuthSignup, Users } from "../api/fakeAuth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(Users);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const findUserByUsername = (username) => {
    return allUsers.find((user) => user.username === username);
  };

  const loginUserWithCredentials = async (username, password) => {
    // try {
    //   const { success, data: user } = await fakeAuthLogin(username, password);
    //   if (success) {
    //     setUser(user);
    //     localStorage?.setItem("authUser", JSON.stringify(user));
    //     return user;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUserByUsername(username);
        if (user) {
          if (user.password === password) {
            setUser(user);
            localStorage?.setItem("authUser", JSON.stringify(user));
            resolve({ success: true, status: 200, data: user });
            return user;
          } else {
            reject({ success: false, status: 401 });
          }
        } else {
          reject({ success: false, status: 401 });
        }
      }, 1500);
    });
  };

  const createUserWithCredentials = async (name, username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUserByUsername(username);
        if (user) {
          reject({ success: false, status: 401 });
        } else {
          const newUser = { name, username, password };
          setUser(newUser);
          setAllUsers((allUsers) => [...allUsers, newUser]);
          localStorage?.setItem("authUser", JSON.stringify(user));
          resolve({ success: true, status: 200, data: user });
          return newUser;
        }
      }, 1500);
    });
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
