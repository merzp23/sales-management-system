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

type TrackRecordItem = {
    id: number;
    title: string;
    estimatedRevenue: string | null;
    status: string;
    note: string | null;
    agency: {
        id: number;
        name: string;
    };
    sale: {
        id: number;
        name: string;
    };
    createdAt: string | null;
};

type TrackRecordsIndexProps = {
    trackRecords: {
        data: TrackRecordItem[];
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
        agencyId: string;
        search: string;
    };
    statusOptions: string[];
    agencies: {
        id: number;
        name: string;
        saleName: string;
    }[];
};

export default function TrackRecordsIndex({
    trackRecords,
    filters,
    statusOptions,
    agencies,
}: TrackRecordsIndexProps) {
    const [values, setValues] = React.useState<
        TrackRecordsIndexProps['filters']
    >(filters);

    const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/track-records',
            {
                status: values.status || undefined,
                agency_id: values.agencyId || undefined,
                search: values.search || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setValues({ status: '', agencyId: '', search: '' });
        router.get('/track-records', {}, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Track Records" />
            <AppLayout title="Track Records">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Pipeline"
                        title="Track record activity"
                        description="Status badges, table density, and supporting metadata are now consistent enough to scale across the remaining MVP pages."
                        action={{
                            label: 'Create Track Record',
                            href: '/track-records/create',
                        }}
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
                                    setValues(
                                        (
                                            current: TrackRecordsIndexProps['filters'],
                                        ) => ({
                                        ...current,
                                        status: value,
                                    }),
                                    )
                                }
                            />
                            <FormSelect
                                label="Agency"
                                name="agency_id"
                                value={values.agencyId}
                                options={agencies.map((agency) => ({
                                    label: `${agency.name} (${agency.saleName})`,
                                    value: agency.id,
                                }))}
                                onChange={(value) =>
                                    setValues(
                                        (
                                            current: TrackRecordsIndexProps['filters'],
                                        ) => ({
                                        ...current,
                                        agencyId: value,
                                    }),
                                    )
                                }
                            />
                            <FormInput
                                label="Keyword"
                                name="search"
                                value={values.search}
                                placeholder="Search title, note, agency, or sale"
                                onChange={(value) =>
                                    setValues(
                                        (
                                            current: TrackRecordsIndexProps['filters'],
                                        ) => ({
                                        ...current,
                                        search: value,
                                    }),
                                    )
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

                    {trackRecords.data.length === 0 ? (
                        <EmptyState
                            title={
                                filters.status || filters.agencyId || filters.search
                                    ? 'No track records match these filters'
                                    : 'No track records yet'
                            }
                            description={
                                filters.status || filters.agencyId || filters.search
                                    ? 'Try a different status, agency, or keyword, or clear the filters to see all records again.'
                                    : 'This page already has its empty-state and list structure, so later implementation work can stay focused on workflow details.'
                            }
                            action={
                                filters.status || filters.agencyId || filters.search
                                    ? {
                                          label: 'Clear filters',
                                          href: '/track-records',
                                      }
                                    : {
                                          label: 'Open create page',
                                          href: '/track-records/create',
                                      }
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            <DataTable
                                rows={trackRecords.data}
                                rowKey={(trackRecord) => trackRecord.id}
                                columns={[
                                    {
                                        key: 'title',
                                        header: 'Title',
                                        cell: (trackRecord) => (
                                            <div>
                                                <div className="font-semibold">
                                                    {trackRecord.title}
                                                </div>
                                                <div className="mt-1 text-xs text-[var(--crm-muted)]">
                                                    Created{' '}
                                                    {trackRecord.createdAt ?? '-'}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'agency',
                                        header: 'Agency / Sale',
                                        cell: (trackRecord) => (
                                            <div className="space-y-1">
                                                <div className="font-medium">
                                                    {trackRecord.agency.name}
                                                </div>
                                                <div className="text-xs text-[var(--crm-muted)]">
                                                    {trackRecord.sale.name}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'revenue',
                                        header: 'Revenue',
                                        cell: (trackRecord) =>
                                            trackRecord.estimatedRevenue
                                                ? `$${Number(
                                                      trackRecord.estimatedRevenue,
                                                  ).toLocaleString()}`
                                                : '-',
                                    },
                                    {
                                        key: 'status',
                                        header: 'Status',
                                        className: 'w-40',
                                        cell: (trackRecord) => (
                                            <StatusBadge
                                                status={trackRecord.status}
                                            />
                                        ),
                                    },
                                    {
                                        key: 'note',
                                        header: 'Note',
                                        cell: (trackRecord) => (
                                            <span className="text-[var(--crm-muted)]">
                                                {trackRecord.note ?? '-'}
                                            </span>
                                        ),
                                    },
                                ]}
                            />

                            <PaginationLinks
                                links={trackRecords.links}
                                from={trackRecords.from}
                                to={trackRecords.to}
                                total={trackRecords.total}
                            />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
