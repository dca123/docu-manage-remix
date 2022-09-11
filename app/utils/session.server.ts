import { db } from "./db.server";
import { compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

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

const storage = createCookieSessionStorage({
  cookie: {},
});

export const createSession = async (userId: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect("/", {
    headers: { "Set-Cookie": await storage.commitSession(session) },
  });
};

export const requireUserId = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    throw redirect("/login");
  }

  return userId;
};

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: { "Set-Cookie": await storage.destroySession(session) },
  });
};

const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (!userId) return null;

  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
};
