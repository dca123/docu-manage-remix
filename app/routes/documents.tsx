import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function DocumentsRoute() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Documents</h1>
        <Link to="new" className="btn">
          New Document
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
