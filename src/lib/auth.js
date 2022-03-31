import { hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = hash(password, 12);

  return hashedPassword;
};

export const comparePassword = async (userPassword, hashedPasswordFromDb) => {
  const areEqual = await compare(userPassword, hashedPasswordFromDb);

  return areEqual;
};
