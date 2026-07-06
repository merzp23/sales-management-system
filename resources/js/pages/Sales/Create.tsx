import { Head, useForm } from '@inertiajs/react';

import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import PageHeader from '@/components/page-header';
import SubmitButton from '@/components/submit-button';
import AppLayout from '@/layouts/app-layout';
import salesRoutes from '@/routes/sales';

type CreateSaleProps = {
    statusOptions: string[];
};

export default function SalesCreate({ statusOptions }: CreateSaleProps) {
    const form = useForm({
        name: '',
        email: '',
        phone_number: '',
        status: statusOptions[0] ?? '',
    });

    const submit = (event: { preventDefault(): void }) => {
        event.preventDefault();
        form.post(salesRoutes.store.url());
    };

    return (
        <>
            <Head title="Create Sale" />
            <AppLayout title="Create Sale">
                <div className="space-y-6">
                    <PageHeader
                        eyebrow="Form Preview"
                        title="Sale form foundation"
                        description="Reusable field spacing, labels, card surfaces, and action placement are defined here now. Full form behavior can be layered in later."
                        action={{ label: 'Back to Sales', href: '/sales' }}
                    />

                    <form
                        onSubmit={submit}
                        className="crm-card-strong max-w-3xl px-6 py-6"
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <FormInput
                                label="Name"
                                name="name"
                                value={form.data.name}
                                placeholder="Ex: Alice Nguyen"
                                required
                                autoComplete="name"
                                onChange={(value) =>
                                    form.setData('name', value)
                                }
                                error={form.errors.name}
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                value={form.data.email}
                                placeholder="alice@example.com"
                                autoComplete="email"
                                onChange={(value) =>
                                    form.setData('email', value)
                                }
                                error={form.errors.email}
                            />
                            <FormInput
                                label="Phone Number"
                                name="phone_number"
                                value={form.data.phone_number}
                                placeholder="0123 456 789"
                                autoComplete="tel"
                                onChange={(value) =>
                                    form.setData('phone_number', value)
                                }
                                error={form.errors.phone_number}
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
                                hint="Allowed values already come from the backend."
                                onChange={(value) =>
                                    form.setData('status', value)
                                }
                                error={form.errors.status}
                            />
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-[var(--crm-line)] pt-5">
                            <p className="text-sm text-[var(--crm-muted)]">
                                Keep the fields simple and aligned with the MVP
                                validation rules from the approved context.
                            </p>
                            <SubmitButton
                                label={
                                    form.processing
                                        ? 'Creating Sale...'
                                        : 'Create Sale'
                                }
                                disabled={form.processing}
                            />
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    );
}
