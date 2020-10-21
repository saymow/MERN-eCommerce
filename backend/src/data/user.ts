import bcrypt from "bcrypt";

const users = [
  {
    name: "AdminUser",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "saymow",
    email: "saymow@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "saymow",
    email: "saymowd@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
