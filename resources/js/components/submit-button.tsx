type SubmitButtonProps = {
    label: string;
    disabled?: boolean;
};

export default function SubmitButton({
    label,
    disabled = false,
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--crm-accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
        >
            {label}
        </button>
    );
}
