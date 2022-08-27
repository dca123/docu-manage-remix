import { json, LoaderFunction, SerializeFrom } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

const LicenseeTable = ({
  licensees,
}: {
  licensees: SerializeFrom<LoaderData>;
}) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Incorporation</th>
        </tr>
      </thead>
      <tbody>
        {licensees.map((licensee) => (
          <tr key={licensee.id}>
            <td>{licensee.name}</td>
            <td>{licensee.incorporation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function LicenseesIndexRoute() {
  const licensees = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Showing all Licensees</p>
      <div className="mt-8">
        <LicenseeTable licensees={licensees}></LicenseeTable>
      </div>
    </div>
  );
}

export const getLoaderData = () => db.licensee.findMany();
type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export const loader: LoaderFunction = async () => {
  return json(await getLoaderData());
};
