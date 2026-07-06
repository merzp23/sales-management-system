type FormSelectOption = {
    label: string;
    value: string | number;
};

type FormSelectProps = {
    label: string;
    name: string;
    value?: string | number | null;
    options: FormSelectOption[];
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (value: string) => void;
};

export default function FormSelect({
    label,
    name,
    value = '',
    options,
    hint,
    error,
    disabled = false,
    required = false,
    onChange,
}: FormSelectProps) {
    return (
        <label className="block">
            <span className="crm-label">{label}</span>
            <select
                className="crm-input"
                name={name}
                value={value ?? ''}
                disabled={disabled}
                required={required}
                onChange={(event) => onChange?.(event.target.value)}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {hint ? (
                <span className="mt-2 block text-xs text-[var(--crm-muted)]">
                    {hint}
                </span>
            ) : null}
            {error ? (
                <span className="mt-2 block text-xs font-medium text-[var(--crm-danger)]">
                    {error}
                </span>
            ) : null}
        </label>
    );
}
