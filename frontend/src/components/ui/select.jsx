
import { useId } from "react";

export default function Select({ label, error, children, ...props }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        className={`
          w-full px-3 py-2 rounded-lg border bg-white outline-none
          focus:border-black transition
          ${error ? "border-red-500" : "border-zinc-200"}
        `}
      >
        {children}
      </select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
