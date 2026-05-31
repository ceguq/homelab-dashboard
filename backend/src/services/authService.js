import bcrypt from "bcryptjs";
import { users } from "../config/users.js";

export function publicUser(user) {
  return { username: user.username };
}

export async function validateCredentials(username, password) {
  const user = users.find((item) => item.username === username);
  const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

  return validPassword ? user : null;
}
