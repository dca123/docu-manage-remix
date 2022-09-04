import { Links, LiveReload, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css";
import { Layout } from "./components/Layout";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export default function App() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <title>DocuManage x Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
