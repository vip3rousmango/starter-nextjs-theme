import * as React from 'react';
import { DefaultBaseLayout } from '../components/layouts/DefaultBaseLayout';
import { BlankBaseLayout } from '../components/layouts/BlankBaseLayout';
import { PageProps } from '../components/layouts';

export const getBaseLayoutComponent = (pageBaseLayout: string | null, siteConfigBaseLayout: string | null): React.FC<PageProps> => {
    const layout = pageBaseLayout ?? siteConfigBaseLayout;

    if (layout === 'BlankBaseLayout') {
        return BlankBaseLayout;
    } else {
        return DefaultBaseLayout;
    }
};
