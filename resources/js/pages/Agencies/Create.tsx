import { Head, useForm } from '@inertiajs/react';

import EmptyState from '@/components/empty-state';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import PageHeader from '@/components/page-header';
import SubmitButton from '@/components/submit-button';
import AppLayout from '@/layouts/app-layout';
import agenciesRoutes from '@/routes/agencies';

type AgencyOption = {
    id: number;
    name: string;
    status: string;
};

type CreateAgencyProps = {
    sales: AgencyOption[];
};

export default function AgenciesCreate({ sales }: CreateAgencyProps) {
    const form = useForm<{
        sale_id: number | '';
        name: string;
        region: string;
        address: string;
    }>({
        sale_id: sales[0]?.id ?? '',
        name: '',
        region: '',
        address: '',
    });

    const submit = (event: { preventDefault(): void }) => {
        event.preventDefault();
        form.post(agenciesRoutes.store.url());
    };

    return (
        <>
            <Head title="Create Agency" />
            <AppLayout title="Create Agency">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Form Preview"
                        title="Agency form foundation"
                        description="Shared field primitives handle labels, hints, border treatment, and error placement consistently."
                        action={{ label: 'Back to Agencies', href: '/agencies' }}
                    />

                    {sales.length === 0 ? (
                        <EmptyState
                            title="Create a Sale before adding Agencies"
                            description="An Agency must belong to one Sale. Add at least one Sale first, then return here to link the agency correctly."
                            action={{
                                label: 'Create Sale',
                                href: '/sales/create',
                            }}
                        />
                    ) : (
                        <form
                            onSubmit={submit}
                            className="crm-card-strong max-w-3xl px-6 py-6"
                        >
                            <div className="grid gap-5 md:grid-cols-2">
                                <FormSelect
                                    label="Sale Owner"
                                    name="sale_id"
                                    value={form.data.sale_id}
                                    options={sales.map((sale) => ({
                                        label: `${sale.name} (${sale.status})`,
                                        value: sale.id,
                                    }))}
                                    hint="Backend-provided options are ready for a later real form."
                                    required
                                    onChange={(value) =>
                                        form.setData(
                                            'sale_id',
                                            value === '' ? '' : Number(value),
                                        )
                                    }
                                    error={form.errors.sale_id}
                                />
                                <FormInput
                                    label="Agency Name"
                                    name="name"
                                    value={form.data.name}
                                    placeholder="Ex: Central Distribution"
                                    required
                                    onChange={(value) =>
                                        form.setData('name', value)
                                    }
                                    error={form.errors.name}
                                />
                                <FormInput
                                    label="Region"
                                    name="region"
                                    value={form.data.region}
                                    placeholder="North"
                                    onChange={(value) =>
                                        form.setData('region', value)
                                    }
                                    error={form.errors.region}
                                />
                                <FormInput
                                    label="Address"
                                    name="address"
                                    value={form.data.address}
                                    placeholder="123 Main Street"
                                    onChange={(value) =>
                                        form.setData('address', value)
                                    }
                                    error={form.errors.address}
                                />
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-[var(--crm-line)] pt-5">
                                <p className="text-sm text-[var(--crm-muted)]">
                                    Agencies stay linked to exactly one Sale, in
                                    line with the approved data model.
                                </p>
                                <SubmitButton
                                    label={
                                        form.processing
                                            ? 'Creating Agency...'
                                            : 'Create Agency'
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
