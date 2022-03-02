import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { toObjectId } from '@stackbit/annotations';

import type { PageProps, AllPageLayoutProps } from '../index';

export const BlankBaseLayout: React.FC<PageProps<AllPageLayoutProps>> = (props) => {
    const { page, site } = props;

    return (
        <div className={classNames('sb-page', page?.pageCssClasses)} {...toObjectId(page?._id)}>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content="Stackbit Components Library" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {props.children}
        </div>
    );
};
