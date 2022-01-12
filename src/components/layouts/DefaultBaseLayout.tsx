import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import type * as types from '.contentlayer/types';
import { FC } from 'react';

type Props = {
  site: types.Config;
  page: any;
  children: React.ReactNode;
};

export const DefaultBaseLayout: FC<Props> = (props) => {
  const { page, site } = props;
  const pageMeta = page?.__metadata ?? {};
  return (
    <div className={classNames('sb-page', pageMeta.pageCssClasses)} data-sb-object-id={pageMeta.id}>
      <div className="sb-base sb-default-base-layout">
        <Head>
          <title>{page.title}</title>
          <meta name="description" content="Stackbit Theme" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={site.favicon} />
        </Head>
        {site.header && <Header {...site.header} annotationPrefix={site._id} />}
        {props.children}
        {site.footer && <Footer {...site.footer} annotationPrefix={site._id} />}
      </div>
    </div>
  );
};
