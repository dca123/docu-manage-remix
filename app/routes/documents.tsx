import { Link, Outlet } from "@remix-run/react";

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
