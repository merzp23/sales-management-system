import { Head, router } from '@inertiajs/react';
import * as React from 'react';

import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import FilterToolbar from '@/components/filter-toolbar';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import PageHeader from '@/components/page-header';
import PaginationLinks from '@/components/pagination-links';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';

type SaleItem = {
    id: number;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    status: string;
    agenciesCount: number;
    createdAt: string | null;
};

type SalesIndexProps = {
    sales: {
        data: SaleItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    filters: {
        status: string;
        search: string;
    };
    statusOptions: string[];
};

export default function SalesIndex({
    sales,
    filters,
    statusOptions,
}: SalesIndexProps) {
    const [values, setValues] = React.useState<SalesIndexProps['filters']>(
        filters,
    );

    const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/sales',
            {
                status: values.status || undefined,
                search: values.search || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setValues({ status: '', search: '' });
        router.get('/sales', {}, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Sales" />
            <AppLayout title="Sales">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Directory"
                        title="Sales owners"
                        description="Shared list styling is in place now: card shell, table spacing, muted metadata, and status badges all follow one pattern."
                        action={{ label: 'Create Sale', href: '/sales/create' }}
                    />

                    <form onSubmit={applyFilters} className="space-y-4">
                        <FilterToolbar>
                            <FormSelect
                                label="Status"
                                name="status"
                                value={values.status}
                                options={statusOptions.map((status) => ({
                                    label: status,
                                    value: status,
                                }))}
                                onChange={(value) =>
                                    setValues((current: SalesIndexProps['filters']) => ({
                                        ...current,
                                        status: value,
                                    }))
                                }
                            />
                            <FormInput
                                label="Keyword"
                                name="search"
                                value={values.search}
                                placeholder="Search name, email, or phone"
                                onChange={(value) =>
                                    setValues((current: SalesIndexProps['filters']) => ({
                                        ...current,
                                        search: value,
                                    }))
                                }
                            />
                        </FilterToolbar>

                        <div className="flex flex-wrap gap-3">
                            <button type="submit" className="crm-button crm-button-primary">
                                Apply filters
                            </button>
                            <button
                                type="button"
                                className="crm-button"
                                onClick={clearFilters}
                            >
                                Clear filters
                            </button>
                        </div>
                    </form>

                    {sales.data.length === 0 ? (
                        <EmptyState
                            title={
                                filters.status || filters.search
                                    ? 'No sales match these filters'
                                    : 'No sales have been added yet'
                            }
                            description={
                                filters.status || filters.search
                                    ? 'Try adjusting the current filters or clear them to see the full list again.'
                                    : 'When the full page workflow is implemented, this space will stay visually consistent and provide a clear first action.'
                            }
                            action={
                                filters.status || filters.search
                                    ? {
                                          label: 'Clear filters',
                                          href: '/sales',
                                      }
                                    : {
                                          label: 'Open create page',
                                          href: '/sales/create',
                                      }
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            <DataTable
                                rows={sales.data}
                                rowKey={(sale) => sale.id}
                                columns={[
                                    {
                                        key: 'name',
                                        header: 'Name',
                                        cell: (sale) => (
                                            <div>
                                                <div className="font-semibold">
                                                    {sale.name}
                                                </div>
                                                <div className="mt-1 text-xs text-[var(--crm-muted)]">
                                                    Added {sale.createdAt ?? '-'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'contact',
                                        header: 'Contact',
                                        cell: (sale) => (
                                            <div className="space-y-1">
                                                <div>{sale.email ?? '-'}</div>
                                                <div className="text-xs text-[var(--crm-muted)]">
                                                    {sale.phoneNumber ?? 'No phone'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'agencies',
                                        header: 'Agencies',
                                        className: 'w-32',
                                        cell: (sale) => (
                                            <span className="font-medium">
                                                {sale.agenciesCount}
                                            </span>
                                        ),
                                    },
                                    {
                                        key: 'status',
                                        header: 'Status',
                                        className: 'w-40',
                                        cell: (sale) => (
                                            <StatusBadge status={sale.status} />
                                        ),
                                    },
                                ]}
                            />

                            <PaginationLinks
                                links={sales.links}
                                from={sales.from}
                                to={sales.to}
                                total={sales.total}
                            />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
