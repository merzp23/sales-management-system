import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
type PageModule = {
    default: ComponentType;
};

createInertiaApp({
    title: (title: string) => (title ? `${title} - ${appName}` : appName),
    resolve: (name: string) => {
        const pages = import.meta.glob<PageModule>('./pages/**/*.tsx', {
            eager: true,
        });

        return pages[`./pages/${name}.tsx`]!;
    },
    setup({ el, App, props }) {
        createRoot(el as HTMLElement).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
