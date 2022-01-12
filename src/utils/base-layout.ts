import { DefaultBaseLayout } from '../components/layouts/DefaultBaseLayout';
import { BlankBaseLayout } from '../components/layouts/BlankBaseLayout';
import { FC } from 'react';

export const getBaseLayoutComponent = (
  pageBaseLayout: string | null,
  siteConfigBaseLayout: string | null
): FC<{ page: any; site: any }> => {
  const layout = pageBaseLayout ?? siteConfigBaseLayout;

  if (layout === 'BlankBaseLayout') {
    return BlankBaseLayout;
  } else {
    return DefaultBaseLayout;
  }
};
