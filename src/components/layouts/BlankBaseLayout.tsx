import * as React from 'react';
import type { FC } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import type * as types from '.contentlayer/types';
import { objectIdDataAttr } from '../../utils/stackbit';

type Props = {
    site: types.Config;
    page: any;
};

export const BlankBaseLayout: FC<Props> = (props) => {
    const { page, site } = props;
    const pageMeta = page?.__metadata ?? {};

    return (
        <div className={classNames('sb-page', pageMeta.pageCssClasses)} {...objectIdDataAttr(page.__metadata)}>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content="Stackbit Components Library" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {props.children}
        </div>
    );
};
