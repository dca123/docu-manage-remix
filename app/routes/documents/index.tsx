import type { LoaderFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { db } from "~/utils/db.server";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const getLoaderData = () =>
  db.document.findMany({
    include: {
      licensee: true,
      user: true,
    },
    orderBy: {
      uploadDate: "desc",
    },
  });

export const loader: LoaderFunction = async () => {
  return json(await getLoaderData());
};

const DocumentsTable = ({
  documents,
}: {
  documents: SerializeFrom<LoaderData>;
}) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Licensee</th>
          <th>Serial</th>
          <th>Status</th>
          <th>Upload Date</th>
          <th>Upload By</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.licensee.name}</td>
            <td>{format(new Date(document.serial), "yyyy-MM-dd")}</td>
            <td>{document.status}</td>
            <td>{format(new Date(document.uploadDate), "yyyy-MM-dd")}</td>
            <td>{document.user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function DocumentsIndexRoute() {
  const documents = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Showing all Documents</p>
      <div className="mt-8 overflow-x-auto">
        <DocumentsTable documents={documents}></DocumentsTable>
      </div>
    </div>
  );
}
