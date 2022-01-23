import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import type * as types from '.contentlayer/types';
import { FC } from 'react';
import { objectIdDataAttr } from '../../utils/stackbit';

export type Props = {
    site: types.Config;
    page: { __metadata: types.Metadata } & Record<string, any>;
};

export const DefaultBaseLayout: FC<Props> = (props) => {
    const { page, site } = props;
    const pageMeta = page?.__metadata ?? {};
    const siteId = `${site.__metadata.id}`;

    return (
        <div className={classNames('sb-page', pageMeta.pageCssClasses)} {...objectIdDataAttr(page.__metadata)}>
            <div className="sb-base sb-default-base-layout">
                <Head>
                    <title>{page.title}</title>
                    <meta name="description" content="Stackbit Theme" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href={site.favicon} />
                </Head>
                {site.header && <Header {...site.header} annotationPrefix={siteId} />}
                {props.children}
                {site.footer && <Footer {...site.footer} annotationPrefix={siteId} />}
            </div>
        </div>
    );
};
