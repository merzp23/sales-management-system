import { Head, useForm } from '@inertiajs/react';

import EmptyState from '@/components/empty-state';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import PageHeader from '@/components/page-header';
import SubmitButton from '@/components/submit-button';
import AppLayout from '@/layouts/app-layout';
import trackRecordsRoutes from '@/routes/track-records';

type AgencyOption = {
    id: number;
    name: string;
    saleName: string;
};

type CreateTrackRecordProps = {
    statusOptions: string[];
    agencies: AgencyOption[];
};

export default function TrackRecordsCreate({
    statusOptions,
    agencies,
}: CreateTrackRecordProps) {
    const form = useForm<{
        agency_id: number | '';
        status: string;
        title: string;
        estimated_revenue: string;
        note: string;
    }>({
        agency_id: agencies[0]?.id ?? '',
        status: statusOptions[0] ?? '',
        title: '',
        estimated_revenue: '',
        note: '',
    });

    const submit = (event: { preventDefault(): void }) => {
        event.preventDefault();
        form.post(trackRecordsRoutes.store.url());
    };

    return (
        <>
            <Head title="Create Track Record" />
            <AppLayout title="Create Track Record">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Form Preview"
                        title="Track record form foundation"
                        description="The shared input and textarea patterns are ready to support a full opportunity form without another visual cleanup round."
                        action={{
                            label: 'Back to Track Records',
                            href: '/track-records',
                        }}
                    />

                    {agencies.length === 0 ? (
                        <EmptyState
                            title="Create an Agency before adding Track Records"
                            description="A Track Record must belong to one Agency. Add at least one Agency first so the opportunity can be linked correctly."
                            action={{
                                label: 'Create Agency',
                                href: '/agencies/create',
                            }}
                        />
                    ) : (
                        <form
                            onSubmit={submit}
                            className="crm-card-strong max-w-4xl px-6 py-6"
                        >
                            <div className="grid gap-5 md:grid-cols-2">
                                <FormSelect
                                    label="Agency"
                                    name="agency_id"
                                    value={form.data.agency_id}
                                    options={agencies.map((agency) => ({
                                        label: `${agency.name} - ${agency.saleName}`,
                                        value: agency.id,
                                    }))}
                                    hint="Agency options are already sourced from the backend."
                                    required
                                    onChange={(value) =>
                                        form.setData(
                                            'agency_id',
                                            value === '' ? '' : Number(value),
                                        )
                                    }
                                    error={form.errors.agency_id}
                                />
                                <FormSelect
                                    label="Status"
                                    name="status"
                                    value={form.data.status}
                                    options={statusOptions.map((status) => ({
                                        label:
                                            status.charAt(0).toUpperCase() +
                                            status.slice(1),
                                        value: status,
                                    }))}
                                    required
                                    onChange={(value) =>
                                        form.setData('status', value)
                                    }
                                    error={form.errors.status}
                                />
                                <FormInput
                                    label="Title"
                                    name="title"
                                    value={form.data.title}
                                    placeholder="Quarterly supply contract"
                                    required
                                    onChange={(value) =>
                                        form.setData('title', value)
                                    }
                                    error={form.errors.title}
                                />
                                <FormInput
                                    label="Estimated Revenue"
                                    name="estimated_revenue"
                                    type="number"
                                    value={form.data.estimated_revenue}
                                    placeholder="50000"
                                    min="0"
                                    step="0.01"
                                    onChange={(value) =>
                                        form.setData('estimated_revenue', value)
                                    }
                                    error={form.errors.estimated_revenue}
                                />
                            </div>
                            <div className="mt-5">
                                <FormTextarea
                                    label="Note"
                                    name="note"
                                    value={form.data.note}
                                    placeholder="Short context about the opportunity"
                                    rows={5}
                                    onChange={(value) =>
                                        form.setData('note', value)
                                    }
                                    error={form.errors.note}
                                />
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-[var(--crm-line)] pt-5">
                                <p className="text-sm text-[var(--crm-muted)]">
                                    Track records stay attached to one Agency
                                    and expose related Sale information where
                                    useful.
                                </p>
                                <SubmitButton
                                    label={
                                        form.processing
                                            ? 'Creating Track Record...'
                                            : 'Create Track Record'
                                    }
                                    disabled={form.processing}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
