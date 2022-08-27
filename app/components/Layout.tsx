import { NavLink } from "@remix-run/react";
import type { ReactElement } from "react";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="mt-4 px-8">
      <div className="navbar rounded-md bg-primary text-primary-content">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl normal-case">
            DocuManage
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <NavLink to="documents" className={activeStyle}>
                Documents
              </NavLink>
            </li>
            <li>
              <NavLink to="licensees" className={activeStyle}>
                Licensees
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8">{children}</div>
    </div>
  );
};

const activeStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold" : "font-normal";
