import { Link } from '@inertiajs/react';

type PageHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
    };
};

export default function PageHeader({
    eyebrow,
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
                {eyebrow ? <div className="crm-kicker">{eyebrow}</div> : null}
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--crm-ink)]">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--crm-muted)]">
                        {description}
                    </p>
                ) : null}
            </div>

            {action ? (
                <Link
                    href={action.href}
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--crm-accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                >
                    {action.label}
                </Link>
            ) : null}
        </div>
    );
}
