import { User } from "../types/User";

// Temporary in-memory storage
const users: User[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const createUser = (user: User): void => {
  users.push(user);
};
