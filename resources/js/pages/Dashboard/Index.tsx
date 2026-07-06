import { Head } from '@inertiajs/react';

import PageHeader from '@/components/page-header';
import StatCard from '@/components/stat-card';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';

type DashboardProps = {
    stats: {
        activeSales: number;
        agencies: number;
        trackRecords: number;
        trackRecordsByStatus: Record<string, number>;
    };
};

export default function DashboardIndex({ stats }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <AppLayout title="Dashboard">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Overview"
                        title="Sales pipeline snapshot"
                        description="A lightweight internal CRM shell with consistent cards, navigation, and status presentation ready for the next MVP flows."
                    />

                    <section className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            title="Active Sales"
                            value={stats.activeSales}
                            hint="Currently marked active"
                            tone="accent"
                        />
                        <StatCard
                            title="Agencies"
                            value={stats.agencies}
                            hint="Linked partner accounts"
                        />
                        <StatCard
                            title="Track Records"
                            value={stats.trackRecords}
                            hint="Open and historical opportunities"
                            tone="success"
                        />
                    </section>

                    <section className="crm-card grid gap-6 px-6 py-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <div className="crm-kicker">Foundation</div>
                            <h2 className="mt-2 text-xl font-semibold">
                                Shared CRM layout is ready
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--crm-muted)]">
                                This starter shell already standardizes page
                                headers, cards, empty states, form surfaces,
                                table styling, and navigation states so later
                                feature pages can focus on workflow details
                                instead of visual cleanup.
                            </p>
                        </div>

                        <div className="crm-card-strong rounded-2xl px-5 py-5">
                            <div className="crm-kicker">Track Record Status</div>
                            <div className="mt-4 grid gap-3">
                                {Object.entries(stats.trackRecordsByStatus).map(
                                    ([status, count]) => (
                                        <div
                                            key={status}
                                            className="flex items-center justify-between rounded-xl border border-[var(--crm-line)] bg-white/80 px-4 py-3"
                                        >
                                            <StatusBadge status={status} />
                                            <span className="text-sm font-semibold">
                                                {count}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayout>
        </>
    );
}
