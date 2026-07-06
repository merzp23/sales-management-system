import { cn } from '@/lib/utils';

type StatusBadgeProps = {
    status: string;
};

const styles: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 ring-slate-200',
    new: 'bg-sky-50 text-sky-700 ring-sky-200',
    contacted: 'bg-amber-50 text-amber-700 ring-amber-200',
    potential: 'bg-violet-50 text-violet-700 ring-violet-200',
    closed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    lost: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const label = status
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                styles[status] ?? 'bg-slate-100 text-slate-600 ring-slate-200',
            )}
        >
            {label}
        </span>
    );
}
