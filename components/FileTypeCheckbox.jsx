export default function FileTypeCheckbox({ label, value, checked, onChange }) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-900">{label}</span>
    </label>
  );
}
