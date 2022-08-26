import { Outlet } from "@remix-run/react";

export default function DocumentsRoute() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Documents</h1>
      <Outlet />
    </div>
  );
}
