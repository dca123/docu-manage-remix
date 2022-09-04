import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { TextInput } from "~/components/form/TextInput";
import { createSession, login } from "~/utils/session.server";

const LoginRoute = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-1/4 flex-col justify-center">
        <h1 className="w-full  text-lg font-light">Login</h1>
        <form
          method="post"
          className=" mt-4 flex flex-col justify-center space-y-4"
        >
          <TextInput name="email" type="email" />
          <TextInput name="password" type="password" />
          <button type="submit" className="btn mt-4">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

type ActionData = {
  formError: string;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  console.log({
    email,
    password,
  });

  if (typeof email !== "string" || typeof password !== "string") {
    console.log("something wrong");
    return badRequest({ formError: "Invalid form data" });
  }

  const fields = { email, password };
  const user = await login({ email, password });

  if (!user) {
    return badRequest({ formError: "Username or Password is invalid" });
  }

  return createSession(user.id);
};

export default LoginRoute;
