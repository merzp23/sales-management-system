type FormTextareaProps = {
    label: string;
    name: string;
    value?: string | null;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    rows?: number;
    required?: boolean;
    onChange?: (value: string) => void;
};

export default function FormTextarea({
    label,
    name,
    value = '',
    placeholder,
    hint,
    error,
    disabled = false,
    rows = 5,
    required = false,
    onChange,
}: FormTextareaProps) {
    return (
        <label className="block">
            <span className="crm-label">{label}</span>
            <textarea
                className="crm-input resize-none"
                name={name}
                value={value ?? ''}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled}
                rows={rows}
                required={required}
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
