import { Links, LiveReload, Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css";
import { Layout } from "./components/Layout";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <LiveReload />
      </body>
    </html>
  );
}
