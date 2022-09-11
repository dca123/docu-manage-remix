import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import styles from "./tailwind.css";
import { Layout } from "./components/Layout";
import { getUser } from "./utils/session.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = Awaited<ReturnType<typeof getUser>>;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json(user);
};

export default function App() {
  const user = useLoaderData() as LoaderData;

  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <title>DocuManage x Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Layout user={user}>
          <Outlet />
        </Layout>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
