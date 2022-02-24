import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { toObjectId } from '@stackbit/annotations';

import { Header } from '../../sections/Header';
import { Footer } from '../../sections/Footer';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '../../../utils/seo-utils';
import { usePlaceholders } from '../../../utils/usePlaceholders';
import type { PageProps, AllPageLayoutProps } from '../index';

export const DefaultBaseLayout: React.FC<PageProps<AllPageLayoutProps>> = (props) => {
    const { page, site } = props;
    const siteMeta = site?.__metadata;
    const pageMeta = page?.__metadata;
    const siteId = siteMeta?.id;
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);

    if (typeof window !== 'undefined' && !window.stackbit) {
        class Stackbit extends EventTarget {
            private _showPlaceholders: boolean;

            constructor() {
                super();
                this._showPlaceholders = false;
            }

            set showPlaceholders(value) {
                this._showPlaceholders = value;
                const event = new CustomEvent("showPlaceholders", {
                    detail: { showPlaceholders: value }
                });
                this.dispatchEvent(event);
            }

            get showPlaceholders() {
                return this._showPlaceholders;
            }
        }
        window.stackbit = new Stackbit();
    }

    const showPlaceholders = usePlaceholders();
    const placeholderText = showPlaceholders ? 'Hide Placeholders' : 'Show Placeholders';
    const handleButton = () => {
        if (typeof window !== 'undefined' && window.stackbit) {
            window.stackbit.showPlaceholders = !window.stackbit?.showPlaceholders;
        }
    };

    return (
        <div className={classNames('sb-page', pageMeta?.pageCssClasses)} {...toObjectId(pageMeta?.id)}>
            <div className="sb-base sb-default-base-layout">
                <Head>
                    <title>{title}</title>
                    {metaDescription && <meta name="description" content={metaDescription} />}
                    {metaTags.map((metaTag) => {
                        if (metaTag.format === 'property') {
                            // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                            return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                        }
                        return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                    })}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {site.favicon && <link rel="icon" href={site.favicon} />}
                </Head>
                <button className="fixed mt-2 ml-2 px-4 py-2 bg-blue-600 text-blue-50 z-20" onClick={handleButton}>{placeholderText}</button>
                {site.header && <Header {...site.header} data-sb-object-id={siteId} />}
                {props.children}
                {site.footer && <Footer {...site.footer} data-sb-object-id={siteId} />}
            </div>
        </div>
    );
};
