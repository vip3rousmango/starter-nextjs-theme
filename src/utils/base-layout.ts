import { DefaultBaseLayout } from '../components/layouts/DefaultBaseLayout';
import { BlankBaseLayout } from '../components/layouts/BlankBaseLayout';
import { FC } from 'react';
import * as types from '.contentlayer/types';

type Props = {
  site: types.Config;
  page: any;
};

export const getBaseLayoutComponent = (
  pageBaseLayout: string | null,
  siteConfigBaseLayout: string | null
): FC<Props> => {
  const layout = pageBaseLayout ?? siteConfigBaseLayout;

  if (layout === 'BlankBaseLayout') {
    return BlankBaseLayout;
  } else {
    return DefaultBaseLayout;
  }
};
