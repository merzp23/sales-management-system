import { Link } from '@inertiajs/react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationLinksProps = {
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

function formatLabel(label: string) {
    return label
        .replace('&laquo; Previous', 'Previous')
        .replace('Next &raquo;', 'Next')
        .replace(/&amp;/g, '&');
}

export default function PaginationLinks({
    links,
    from,
    to,
    total,
}: PaginationLinksProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--crm-muted)]">
                Showing {from ?? 0} to {to ?? 0} of {total}
            </p>

            <div className="flex flex-wrap gap-2">
                {links.map((link) =>
                    link.url ? (
                        <Link
                            key={`${link.label}-${link.url}`}
                            href={link.url}
                            className={`inline-flex min-w-10 items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                link.active
                                    ? 'border-[var(--crm-accent)] bg-[var(--crm-accent)] text-white'
                                    : 'border-[var(--crm-line)] bg-white/80 text-[var(--crm-ink)] hover:bg-white'
                            }`}
                        >
                            {formatLabel(link.label)}
                        </Link>
                    ) : (
                        <span
                            key={`${link.label}-disabled`}
                            className="inline-flex min-w-10 items-center justify-center rounded-xl border border-[var(--crm-line)] bg-white/50 px-3 py-2 text-sm text-[var(--crm-muted)]"
                        >
                            {formatLabel(link.label)}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
