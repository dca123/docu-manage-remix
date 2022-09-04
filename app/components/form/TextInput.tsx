import capitalize from "capitalize";
import { InputHTMLAttributes } from "react";

export const TextInput = ({
  label,
  name,
  type = "text",
}: {
  label?: string;
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}) => {
  const displayLabel = label ?? capitalize(name);
  return (
    <div className="form-control w-full ">
      <label className="label" htmlFor={name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        name={name}
        id={name}
        type={type}
        className="input input-bordered"
      />
    </div>
  );
};
