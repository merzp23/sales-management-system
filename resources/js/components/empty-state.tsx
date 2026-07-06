import { Link } from '@inertiajs/react';

type EmptyStateProps = {
    title: string;
    description: string;
    action?: {
        label: string;
        href: string;
    };
};

export default function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="crm-card-strong flex flex-col items-start rounded-2xl border border-dashed px-6 py-8 text-left">
            <div className="crm-kicker">Empty State</div>
            <h3 className="mt-3 text-lg font-semibold">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--crm-muted)]">
                {description}
            </p>
            {action ? (
                <Link
                    href={action.href}
                    className="mt-5 inline-flex rounded-xl border border-[var(--crm-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--crm-ink)] transition hover:border-blue-200 hover:text-[var(--crm-accent)]"
                >
                    {action.label}
                </Link>
            ) : null}
        </div>
    );
}
