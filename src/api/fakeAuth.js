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

export const fakeAuth = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUsername(username);
      user.password === password
        ? resolve({ success: true, status: 200, data: user })
        : reject({ success: false, status: 401 });
    }, 1500);
  });
};
