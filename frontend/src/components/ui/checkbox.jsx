
export default function Checkbox({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          {...props}
          type="checkbox"
          className="w-4 h-4 rounded"
        />
        {label}
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
