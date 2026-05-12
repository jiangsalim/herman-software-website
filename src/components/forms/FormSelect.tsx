interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormSelect({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="text-overline mb-1 block text-charcoal">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-medium/30 bg-white px-4 py-3 text-body text-charcoal focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}