import { Link } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <div className="hero rounded-md bg-base-200 drop-shadow-md">
      <div className="hero-content my-12 flex-col">
        <h1 className="text-5xl font-bold">DocuManage</h1>
        <p className="py-6">
          Welcome to your document management system powered by{" "}
          <a
            href="https://remix.run"
            className="underline hover:text-primary-focus"
            target="_blank"
            rel="noreferrer"
          >
            Remix
          </a>
        </p>
        <Link to="/documents" className="btn btn-primary">
          Get Started !
        </Link>
      </div>
    </div>
  );
}
