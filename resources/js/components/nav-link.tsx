import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

type NavLinkProps = {
    href: string;
    label: string;
    description?: string;
    isActive?: boolean;
};

export default function NavLink({
    href,
    label,
    description,
    isActive = false,
}: NavLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group flex items-start gap-3 rounded-2xl px-4 py-3 transition',
                isActive
                    ? 'bg-[var(--crm-accent)]/10 text-[var(--crm-accent)]'
                    : 'text-[var(--crm-muted)] hover:bg-white/75 hover:text-[var(--crm-ink)]',
            )}
        >
            <span
                className={cn(
                    'mt-1 h-2.5 w-2.5 rounded-full transition',
                    isActive
                        ? 'bg-[var(--crm-accent)]'
                        : 'bg-slate-300 group-hover:bg-slate-400',
                )}
            />
            <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                {description ? (
                    <span
                        className={cn(
                            'mt-1 block text-sm',
                            isActive ? 'text-[var(--crm-accent)]/80' : '',
                        )}
                    >
                        {description}
                    </span>
                ) : null}
            </span>
        </Link>
    );
}
