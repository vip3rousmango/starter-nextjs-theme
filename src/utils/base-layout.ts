import { DefaultBaseLayout } from '../components/layouts/DefaultBaseLayout';
import { BlankBaseLayout } from '../components/layouts/BlankBaseLayout';
import { FC } from 'react';

export const getBaseLayoutComponent = (
    pageBaseLayout: string | undefined,
    siteConfigBaseLayout: string | undefined
): FC<{ page: any; site: any }> => {
    const layout = pageBaseLayout ?? siteConfigBaseLayout;

    if (layout === 'BlankBaseLayout') {
        return BlankBaseLayout;
    } else {
        return DefaultBaseLayout;
    }
};
