type FormInputProps = {
    label: string;
    name: string;
    type?: string;
    value?: string | number | null;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    step?: string;
    min?: string;
    onChange?: (value: string) => void;
};

export default function FormInput({
    label,
    name,
    type = 'text',
    value = '',
    placeholder,
    hint,
    error,
    disabled = false,
    required = false,
    autoComplete,
    step,
    min,
    onChange,
}: FormInputProps) {
    return (
        <label className="block">
            <span className="crm-label">{label}</span>
            <input
                className="crm-input"
                name={name}
                type={type}
                value={value ?? ''}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled}
                required={required}
                autoComplete={autoComplete}
                step={step}
                min={min}
                onChange={(event) => onChange?.(event.target.value)}
            />
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
