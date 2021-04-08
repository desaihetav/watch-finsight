const Users = [
  {
    username: "admin",
    password: "admin",
    name: "Admin",
  },
  {
    username: "desaihetav",
    password: "pass123",
    name: "Hetav Desai",
  },
];

const findUserByUsername = (username) => {
  return Users.find((user) => user.username === username);
};

export const fakeAuthLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUsername(username);
      if (user) {
        user.password === password
          ? resolve({ success: true, status: 200, data: user })
          : reject({ success: false, status: 401 });
      } else {
        reject({ success: false, status: 401 });
      }
    }, 1500);
  });
};

export const fakeAuthSignup = (name, username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUsername(username);
      if (user) {
        reject({ success: false, status: 401 });
      } else {
        console.log("herererer");
        resolve({ success: true, status: 200, data: user });
        console.log("herererer");
      }
    }, 1500);
  });
};
