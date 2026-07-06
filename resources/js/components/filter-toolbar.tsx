import * as React from 'react';

type FilterToolbarProps = {
    children: React.ReactNode;
};

export default function FilterToolbar({ children }: FilterToolbarProps) {
    return (
        <div className="crm-card p-4 sm:p-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {children}
            </div>
        </div>
    );
}
