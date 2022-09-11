import { User } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import type { ReactElement } from "react";

export const Layout = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactElement;
}) => {
  return (
    <div className="mt-4 px-8">
      <div className="navbar rounded-md bg-primary text-primary-content">
        <div className="navbar-start">
          <NavLink to="/" className="btn btn-ghost text-xl normal-case">
            DocuManage
          </NavLink>
        </div>
        <div className="navbar-center">
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
        <div className="navbar-end space-x-4">
          <AuthButton user={user} />
          <div className="pr-4">
            <LogoutButton user={user} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">{children}</div>
    </div>
  );
};

const LogoutButton = ({ user }: { user: User | null }) => {
  if (!user) return null;
  return (
    <form method="POST" action="/logout">
      <button type="submit">Logout</button>
    </form>
  );
};

const AuthButton = ({ user }: { user: User | null }) => {
  if (user === null) {
    return (
      <NavLink to="login" className={activeStyle}>
        Login
      </NavLink>
    );
  }
  return <h1>Hey {user.email} !</h1>;
};

const activeStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold" : "font-normal";
