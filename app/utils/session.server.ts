import { db } from "./db.server";
import { compare } from "bcryptjs";

type LoginForm = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginForm) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return null;

  const isCorrectPassword = await compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return { id: user.id, email: user.email };
};
