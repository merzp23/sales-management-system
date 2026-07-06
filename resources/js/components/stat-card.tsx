import { cn } from '@/lib/utils';

type StatCardProps = {
    title: string;
    value: string | number;
    hint?: string;
    tone?: 'default' | 'accent' | 'success';
};

const toneClasses = {
    default: 'from-white to-slate-50',
    accent: 'from-blue-50 to-cyan-50',
    success: 'from-teal-50 to-emerald-50',
};

export default function StatCard({
    title,
    value,
    hint,
    tone = 'default',
}: StatCardProps) {
    return (
        <div
            className={cn(
                'crm-card-strong bg-gradient-to-br px-5 py-5',
                toneClasses[tone],
            )}
        >
            <div className="crm-kicker">{title}</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-[var(--crm-ink)]">
                {value}
            </div>
            {hint ? (
                <div className="mt-2 text-sm text-[var(--crm-muted)]">
                    {hint}
                </div>
            ) : null}
        </div>
    );
}
