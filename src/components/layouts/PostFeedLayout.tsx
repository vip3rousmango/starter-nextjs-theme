import * as React from 'react';
import classNames from 'classnames';
import * as types from '.contentlayer/types';
import { FC } from 'react';

import { Link } from '../atoms/Link';
import { getBaseLayoutComponent } from '../../utils/base-layout';
import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { PostFeedSection } from '../sections/PostFeedSection';
import { DynamicComponent } from '../DynamicComponent';
import { mapSections } from '../sections/mapSection';
import { resolveBlogPostLayout } from '../../utils/data-helpers';

export type Props = ReturnType<typeof resolveProps>;

export const PostFeedLayout: FC<Props> = ({ page, site }) => {
    const BaseLayout = getBaseLayoutComponent(page.baseLayout!, site.baseLayout!);
    const { title, topSections, bottomSections, pageIndex, baseUrlPath, numOfPages, postFeed, items } = page;
    const postFeedColors = postFeed?.colors ?? 'colors-a';
    const postFeedWidth = postFeed?.styles?.self?.width ?? 'wide';
    const postFeedJustifyContent = postFeed?.styles?.self?.justifyContent ?? 'center';
    const pageLinks = <PageLinks {...{ pageIndex, baseUrlPath, numOfPages }} />;

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="layout page-layout">
                {title && (
                    <div className={classNames('flex', 'py-12', 'lg:py-14', 'px-4', postFeedColors, mapStyles({ justifyContent: postFeedJustifyContent }))}>
                        <h1
                            className={classNames('w-full', mapMaxWidthStyles(postFeedWidth), page?.styles?.title ? mapStyles(page?.styles?.title) : null)}
                            data-sb-field-path="title"
                        >
                            {title}
                        </h1>
                    </div>
                )}
                {topSections && topSections.length > 0 && (
                    <div data-sb-field-path="topSections">
                        {topSections.map((section, index) => (
                            <DynamicComponent key={index} {...section} data-sb-field-path={`topSections.${index}`} />
                        ))}
                    </div>
                )}
                <PostFeedSection {...postFeed} posts={items} pageLinks={pageLinks} data-sb-field-path="postFeed" />
                {bottomSections && bottomSections.length > 0 && (
                    <div data-sb-field-path="bottomSections">
                        {bottomSections.map((section, index) => (
                            <DynamicComponent key={index} {...section} data-sb-field-path={`bottomSections.${index}`} />
                        ))}
                    </div>
                )}
            </main>
        </BaseLayout>
    );
};

export type PartialPostFeedLayout = Partial<Omit<types.PostFeedLayout, 'postFeed'> & { postFeed: Partial<types.PagedPostsSection> }>

export const resolveProps = (postFeedLayout: PartialPostFeedLayout & types.Pagination<types.PostLayout>, allDocuments: types.DocumentTypes[]) => {
    const config = allDocuments.find(types.isType('Config'))!;
    const items = postFeedLayout.items.map(((post) => {
        return resolveBlogPostLayout(post, allDocuments);
    }));

    return {
        type: 'PostFeedLayout' as const,
        site: { ...config, baseLayout: null },
        page: {
            ...postFeedLayout,
            items,
            topSections: mapSections(postFeedLayout.topSections ?? [], allDocuments),
            bottomSections: mapSections(postFeedLayout.bottomSections ?? [], allDocuments),
            baseLayout: null
        }
    };
};

const PageLinks: FC<{ pageIndex: number; baseUrlPath: string; numOfPages: number }> = ({ pageIndex, baseUrlPath, numOfPages }) => {
    if (numOfPages < 2) {
        return null;
    }
    const pageLinks = [];
    const padRange = 2;
    const startIndex = pageIndex - padRange > 2 ? pageIndex - padRange : 0;
    const endIndex = pageIndex + padRange < numOfPages - 3 ? pageIndex + padRange : numOfPages - 1;

    // following logic renders pagination controls:
    // for example, if the current page is 6 (pageIndex === 5)
    //              ↓
    // ← 1 ... 4 5 6 7 8 ... 20 →
    //         ↑       ↑
    // and padRange === 2, then it renders from 4 (6 - 2) to 8 (6 + 2)

    // renders prev "←" button, if the current page is the first page, the button is disabled
    if (pageIndex > 0) {
        pageLinks.push(<PageLink key="prev" pageIndex={pageIndex - 1} buttonLabel="←" baseUrlPath={baseUrlPath} />);
    } else {
        pageLinks.push(<PageLinkDisabled key="prev" buttonLabel="←" />);
    }

    // if startIndex is not 0, then render the first page followed by ellipsis, if needed.
    if (startIndex > 0) {
        pageLinks.push(<PageLink key="0" pageIndex={0} buttonLabel="1" baseUrlPath={baseUrlPath} />);
        if (startIndex > 1) {
            pageLinks.push(<Ellipsis key="beforeEllipsis" />);
        }
    }

    // render all pages between startIndex and endIndex, the current page should be disabled
    for (let i = startIndex; i <= endIndex; i++) {
        if (pageIndex === i) {
            pageLinks.push(<PageLinkDisabled key={i} buttonLabel={i + 1} />);
        } else {
            pageLinks.push(<PageLink key={i} pageIndex={i} buttonLabel={i + 1} baseUrlPath={baseUrlPath} />);
        }
    }

    // if endIndex is not the last page, then render the last page preceded by ellipsis, if needed.
    if (endIndex < numOfPages - 1) {
        if (endIndex < numOfPages - 2) {
            pageLinks.push(<Ellipsis key="afterEllipsis" />);
        }
        pageLinks.push(<PageLink key={numOfPages - 1} pageIndex={numOfPages - 1} buttonLabel={numOfPages} baseUrlPath={baseUrlPath} />);
    }

    // renders next "→" button, if the current page is the last page, the button is disabled
    if (pageIndex < numOfPages - 1) {
        pageLinks.push(<PageLink key="next" pageIndex={pageIndex + 1} buttonLabel="→" baseUrlPath={baseUrlPath} />);
    } else {
        pageLinks.push(<PageLinkDisabled key="next" buttonLabel="→" />);
    }

    return <div className={classNames('flex flex-row items-center justify-center mt-12 sm:mt-20')}>{pageLinks}</div>;
};

const PageLink: FC<{ pageIndex: number; buttonLabel: string | number; baseUrlPath: string }> = ({ pageIndex, buttonLabel, baseUrlPath }) => {
    return (
        <Link href={urlPathForPageAtIndex(pageIndex, baseUrlPath)} className="px-4 py-2 mx-2 sb-component-button sb-component-button-secondary">
            {buttonLabel}
        </Link>
    );
};

const PageLinkDisabled: FC<{ buttonLabel: string | number }> = ({ buttonLabel }) => {
    return (
        <span key="next" className="px-4 py-2 mx-2 opacity-25 sb-component-button sb-component-button-secondary">
            {buttonLabel}
        </span>
    );
};

const Ellipsis: FC = () => <span className="px-4 py-2 mx-2">…</span>;

function urlPathForPageAtIndex(pageIndex: number, baseUrlPath: string) {
    return pageIndex === 0 ? baseUrlPath : `${baseUrlPath}/page/${pageIndex + 1}`;
}

function mapMaxWidthStyles(width: string) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
