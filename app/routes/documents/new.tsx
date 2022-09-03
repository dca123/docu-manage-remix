import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import capitalize from "capitalize";
import { db } from "~/utils/db.server";
import { Periodicity } from "@prisma/client";

export default function NewDocumentRoute() {
  return (
    <div>
      <h1 className="text-lg font-bold">New Document</h1>
      <form method="post" className="mt-4">
        <div className="space-y-4">
          <LicenseeInput />
          <TextInput name="serial" />
          <PeriodInput />
        </div>
        <button type="submit" className="btn mt-4">
          Create Document
        </button>
      </form>
    </div>
  );
}

type ActionData = {
  formError: string;
};
const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request, context }) => {
  const data = await request.formData();

  const licenseeId = data.get("licenseeId");
  const serial = data.get("serial");
  const periodicity = data.get("periodicity");

  if (
    typeof licenseeId !== "string" ||
    typeof serial !== "string" ||
    typeof periodicity !== "string"
  ) {
    return badRequest({
      formError: "Form not submitted correctly",
    });
  }

  const fields = {
    licenseeId,
    serial: new Date(serial),
    periodicity: periodicity as Periodicity,
  };

  const document = await db.document.create({
    data: { ...fields, status: "PENDING" },
  });

  console.log({
    licenseeId,
    serial,
    periodicity,
    document,
  });

  return redirect("/documents");
};

const PeriodInput = () => {
  return (
    <div>
      <span className="label-text">Period</span>
      <div className="flex space-x-4">
        {Object.keys(Periodicity).map((period) => (
          <PeriodRadioOption key={period} name={period} />
        ))}
      </div>
    </div>
  );
};

const PeriodRadioOption = ({
  label,
  name,
}: {
  label?: string;
  name: string;
}) => {
  const displayLabel = label ?? capitalize(name);
  return (
    <div className="form-control">
      <label className="label cursor-pointer space-x-2">
        <input
          type="radio"
          name="periodicity"
          value={name}
          className="radio checked:bg-red-500"
        />
        <span className="label-text">{displayLabel}</span>
      </label>
    </div>
  );
};

export const getLoaderData = () => db.licensee.findMany();
type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export const loader: LoaderFunction = async () => {
  return json(await getLoaderData());
};

const LicenseeInput = () => {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Licensee</span>
      </label>
      <select className="select select-bordered" name="licenseeId">
        {data.map((licensee) => (
          <option key={licensee.id} value={licensee.id}>
            {licensee.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const TextInput = ({ label, name }: { label?: string; name: string }) => {
  const displayLabel = label ?? capitalize(name);
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        name={name}
        id={name}
        type="text"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};
