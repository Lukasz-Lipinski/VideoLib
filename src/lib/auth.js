import { hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = hash(password, 12);

  return hashedPassword;
};
