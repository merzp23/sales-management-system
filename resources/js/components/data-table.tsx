type DataTableColumn<T> = {
    key: string;
    header: string;
    className?: string;
    cell: (row: T) => any;
};

type DataTableProps<T> = {
    columns: DataTableColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string | number;
};

export default function DataTable<T>({
    columns,
    rows,
    rowKey,
}: DataTableProps<T>) {
    return (
        <div className="crm-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--crm-line)]">
                    <thead className="bg-white/70">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[var(--crm-muted)] ${column.className ?? ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--crm-line)] bg-white/40">
                        {rows.map((row) => (
                            <tr
                                key={rowKey(row)}
                                className="transition hover:bg-white/90"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-5 py-4 align-top text-sm text-[var(--crm-ink)] ${column.className ?? ''}`}
                                    >
                                        {column.cell(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
