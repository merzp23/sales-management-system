import { Head, router } from '@inertiajs/react';
import * as React from 'react';

import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import FilterToolbar from '@/components/filter-toolbar';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import PageHeader from '@/components/page-header';
import PaginationLinks from '@/components/pagination-links';
import AppLayout from '@/layouts/app-layout';

type AgencyItem = {
    id: number;
    name: string;
    address: string | null;
    region: string | null;
    sale: {
        id: number;
        name: string;
    };
    trackRecordsCount: number;
    createdAt: string | null;
};

type AgenciesIndexProps = {
    agencies: {
        data: AgencyItem[];
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
        saleId: string;
        search: string;
    };
    sales: {
        id: number;
        name: string;
    }[];
};

export default function AgenciesIndex({
    agencies,
    filters,
    sales,
}: AgenciesIndexProps) {
    const [values, setValues] = React.useState<AgenciesIndexProps['filters']>(
        filters,
    );

    const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/agencies',
            {
                sale_id: values.saleId || undefined,
                search: values.search || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setValues({ saleId: '', search: '' });
        router.get('/agencies', {}, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Agencies" />
            <AppLayout title="Agencies">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Partners"
                        title="Agency accounts"
                        description="Reusable table and metadata patterns can support relation-heavy pages without a separate styling pass later."
                        action={{
                            label: 'Create Agency',
                            href: '/agencies/create',
                        }}
                    />

                    <form onSubmit={applyFilters} className="space-y-4">
                        <FilterToolbar>
                            <FormSelect
                                label="Sale owner"
                                name="sale_id"
                                value={values.saleId}
                                options={sales.map((sale) => ({
                                    label: sale.name,
                                    value: sale.id,
                                }))}
                                onChange={(value) =>
                                    setValues((current: AgenciesIndexProps['filters']) => ({
                                        ...current,
                                        saleId: value,
                                    }))
                                }
                            />
                            <FormInput
                                label="Keyword"
                                name="search"
                                value={values.search}
                                placeholder="Search agency, region, address, or sale"
                                onChange={(value) =>
                                    setValues((current: AgenciesIndexProps['filters']) => ({
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

                    {agencies.data.length === 0 ? (
                        <EmptyState
                            title={
                                filters.saleId || filters.search
                                    ? 'No agencies match these filters'
                                    : 'No agencies are available'
                            }
                            description={
                                filters.saleId || filters.search
                                    ? 'Try a different sale owner or keyword, or clear the filters to return to the full list.'
                                    : 'The empty-state component is ready now, so every list page can fall back to the same visual language.'
                            }
                            action={
                                filters.saleId || filters.search
                                    ? {
                                          label: 'Clear filters',
                                          href: '/agencies',
                                      }
                                    : {
                                          label: 'Open create page',
                                          href: '/agencies/create',
                                      }
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            <DataTable
                                rows={agencies.data}
                                rowKey={(agency) => agency.id}
                                columns={[
                                    {
                                        key: 'agency',
                                        header: 'Agency',
                                        cell: (agency) => (
                                            <div>
                                                <div className="font-semibold">
                                                    {agency.name}
                                                </div>
                                                <div className="mt-1 text-xs text-[var(--crm-muted)]">
                                                    Created {agency.createdAt ?? '-'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'sale',
                                        header: 'Sale Owner',
                                        cell: (agency) => (
                                            <div>
                                                <div className="font-medium">
                                                    {agency.sale.name}
                                                </div>
                                                <div className="mt-1 text-xs text-[var(--crm-muted)]">
                                                    {agency.trackRecordsCount}{' '}
                                                    track record
                                                    {agency.trackRecordsCount === 1
                                                        ? ''
                                                        : 's'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'location',
                                        header: 'Location',
                                        cell: (agency) => (
                                            <div className="space-y-1">
                                                <div>{agency.region ?? '-'}</div>
                                                <div className="text-xs text-[var(--crm-muted)]">
                                                    {agency.address ?? 'No address'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                ]}
                            />

                            <PaginationLinks
                                links={agencies.links}
                                from={agencies.from}
                                to={agencies.to}
                                total={agencies.total}
                            />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
