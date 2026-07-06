import { Link, usePage } from '@inertiajs/react';

import NavLink from '@/components/nav-link';

const navigation = [
    {
        label: 'Dashboard',
        href: '/',
        description: 'Overview and status',
    },
    {
        label: 'Sales',
        href: '/sales',
        description: 'Owners and contacts',
    },
    {
        label: 'Agencies',
        href: '/agencies',
        description: 'Partner organizations',
    },
    {
        label: 'Track Records',
        href: '/track-records',
        description: 'Pipeline and outcomes',
    },
];

type AppLayoutProps = {
    title?: string;
    children: any;
};

export default function AppLayout({ title, children }: AppLayoutProps) {
    const page = usePage();
    const currentUrl = page.url;
    const flash = (page.props.flash as { success?: string | null } | undefined)
        ?.success;

    return (
        <div className="min-h-screen">
            <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
                <aside className="crm-card hidden w-80 shrink-0 overflow-hidden lg:flex lg:flex-col">
                    <div className="border-b border-[var(--crm-line)] px-6 py-6">
                        <Link href="/" className="block">
                            <div className="crm-kicker">Sales Management</div>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--crm-accent)] text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
                                    CRM
                                </div>
                                <div>
                                    <div className="text-base font-semibold">
                                        Internal Workspace
                                    </div>
                                    <div className="mt-1 text-sm text-[var(--crm-muted)]">
                                        Simple sales, agency, and pipeline flow
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-5">
                        <div className="crm-kicker px-2">Navigation</div>
                        <div className="mt-3 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    description={item.description}
                                    isActive={
                                        item.href === '/'
                                            ? currentUrl === '/'
                                            : currentUrl.startsWith(item.href)
                                    }
                                />
                            ))}
                        </div>
                    </nav>

                    <div className="border-t border-[var(--crm-line)] px-6 py-5">
                        <div className="crm-card-strong rounded-xl px-4 py-4">
                            <div className="crm-kicker">Project State</div>
                            <div className="mt-2 text-sm font-medium">
                                MVP foundation in progress
                            </div>
                            <p className="mt-2 text-sm leading-6 text-[var(--crm-muted)]">
                                Layout and shared UI are prepared so the next
                                feature pages can reuse one consistent shell.
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <header className="crm-card flex items-center justify-between px-5 py-4 sm:px-6">
                        <div>
                            <div className="crm-kicker">Workspace</div>
                            <div className="mt-1 text-lg font-semibold">
                                {title ?? 'Sales Management System'}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full border border-[var(--crm-line)] bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--crm-muted)]">
                                MVP
                            </span>
                        </div>
                    </header>

                    <nav className="crm-card flex gap-2 overflow-x-auto px-3 py-3 lg:hidden">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isActive={
                                    item.href === '/'
                                        ? currentUrl === '/'
                                        : currentUrl.startsWith(item.href)
                                }
                            />
                        ))}
                    </nav>

                    {flash ? (
                        <div className="crm-card-strong flex items-center justify-between gap-3 border border-emerald-200 bg-emerald-50/90 px-5 py-4 text-sm text-emerald-800">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-semibold">
                                    ✓
                                </span>
                                <span className="font-medium">{flash}</span>
                            </div>
                        </div>
                    ) : null}
                    <main className="min-w-0">{children}</main>
                </div>
            </div>
        </div>
    );
}
