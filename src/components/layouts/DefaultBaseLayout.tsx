import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '../../utils/seo-utils';
import type * as types from '.contentlayer/types';
import { FC } from 'react';
import { objectIdDataAttr } from '../../utils/stackbit';


export type Props = {
    site: types.Config;
    page: { __metadata: types.Metadata } & Record<string, any>;
};

export const DefaultBaseLayout: FC<Props> = (props) => {
    const { page, site } = props;
    const siteMeta = site?.__metadata || {};
    const pageMeta = page?.__metadata || {};
    const siteId = `${siteMeta.id}`;
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    return (
        <div className={classNames('sb-page', pageMeta.pageCssClasses)} {...objectIdDataAttr(pageMeta)}>
            <div className="sb-base sb-default-base-layout">
                <Head>
                <title>{title}</title>
                    {metaDescription && <meta name="description" content={metaDescription} />}
                    {metaTags.map((metaTag) => {
                      if (metaTag.format === 'property' ) {
                        // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                        return  <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />
                      }
                      return  <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />
                    })}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {site.favicon && <link rel="icon" href={site.favicon} />}
                </Head>
                {site.header && <Header {...site.header} annotationPrefix={siteId} />}
                {props.children}
                {site.footer && <Footer {...site.footer} annotationPrefix={siteId} />}
            </div>
        </div>
    );
};
