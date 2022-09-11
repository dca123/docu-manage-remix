import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function DocumentsRoute() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Licensees</h1>
      <Outlet />
    </div>
  );
}
