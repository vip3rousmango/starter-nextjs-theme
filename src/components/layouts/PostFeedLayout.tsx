import * as React from 'react';
import classNames from 'classnames';
import * as types from '.contentlayer/types';
import { FC } from 'react';

import { Link } from '../atoms/Link';
import { getBaseLayoutComponent } from '../../utils/base-layout';
import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { PostFeedSection } from '../sections/PostFeedSection';
import { DynamicComponent } from '../DynamicComponent';
import { sortPostsByDateDesc } from '../../utils/data-helpers';
import { mapSections } from '../sections/mapSection';

export type Props = ReturnType<typeof resolveProps>;

export const PostFeedLayout: FC<Props> = ({ page, site, posts }) => {
  const BaseLayout = getBaseLayoutComponent(page.baseLayout!, site.baseLayout!);
  const { title, topSections, bottomSections, pageIndex, baseUrlPath, numOfPages, postFeed } = page;
  const postFeedColors = postFeed?.colors ?? 'colors-a';
  const postFeedWidth = postFeed?.styles?.self?.width ?? 'wide';
  const postFeedJustifyContent = postFeed?.styles?.self?.justifyContent ?? 'center';
  const pageLinks = <PageLinks {...{ pageIndex, baseUrlPath, numOfPages }} />;

  return (
    <BaseLayout page={page} site={site}>
      <main id="main" className="layout page-layout">
        {title && (
          <div
            className={classNames(
              'flex',
              'py-12',
              'lg:py-14',
              'px-4',
              postFeedColors,
              mapStyles({ justifyContent: postFeedJustifyContent })
            )}
          >
            <h1
              className={classNames(
                'w-full',
                mapMaxWidthStyles(postFeedWidth),
                page?.styles?.title ? mapStyles(page?.styles?.title) : null
              )}
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
        <PostFeedSection {...postFeed} posts={posts} pageLinks={pageLinks} data-sb-field-path="postFeed" />
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

const POSTS_PER_PAGE = 10;
const baseUrlPath = '/blog';

export const resolveProps = (slug: string, allDocuments: types.DocumentTypes[]) => {
  const { filterByAuthorSlug, pageIndex } = pageInfoFromSlug(slug);
  const allPostLayouts = allDocuments.filter(types.isType('PostLayout'));
  const { bottomSections, topSections, ...postFeedLayout } = allDocuments.filter(types.isType('PostFeedLayout'))[0]!;
  const config = allDocuments.filter(types.isType('Config'))[0]!;

  const filteredPosts =
    filterByAuthorSlug === null
      ? allPostLayouts
      : allPostLayouts.filter(({ author }) => author?.slug === filterByAuthorSlug);
  const numOfPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const posts = filteredPosts
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
    .sort(sortPostsByDateDesc);

  return {
    type: 'PostFeedLayout' as const,
    site: { ...config, baseLayout: null },
    page: {
      ...postFeedLayout,
      bottomSections: mapSections(bottomSections ?? [], allDocuments),
      topSections: mapSections(topSections ?? [], allDocuments),
      numOfPages,
      baseUrlPath,
      pageIndex,
      baseLayout: null
    },
    posts
  };
};

const pageInfoFromSlug = (slug: string) => {
  // https://regex101.com/r/bzQKL1/1
  const regex = /(author\/(?<authorName>[a-zA-Z-_]+)\/?)?(page\/(?<pageIndex>\d+))?/;
  const match = slug.match(regex);

  const pageIndex = match?.groups?.pageIndex ? parseInt(match.groups.pageIndex) - 1 : 0;
  const filterByAuthorSlug = match?.groups?.authorName ?? null;

  return { pageIndex, filterByAuthorSlug };
};

const PageLinks: FC<{ pageIndex: number; baseUrlPath: string; numOfPages: number }> = ({
  pageIndex,
  baseUrlPath,
  numOfPages
}) => {
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
    pageLinks.push(
      <PageLink key={numOfPages - 1} pageIndex={numOfPages - 1} buttonLabel={numOfPages} baseUrlPath={baseUrlPath} />
    );
  }

  // renders next "→" button, if the current page is the last page, the button is disabled
  if (pageIndex < numOfPages - 1) {
    pageLinks.push(<PageLink key="next" pageIndex={pageIndex + 1} buttonLabel="→" baseUrlPath={baseUrlPath} />);
  } else {
    pageLinks.push(<PageLinkDisabled key="next" buttonLabel="→" />);
  }

  return <div className={classNames('flex flex-row items-center justify-center mt-12 sm:mt-20')}>{pageLinks}</div>;
};

const PageLink: FC<{ pageIndex: number; buttonLabel: string | number; baseUrlPath: string }> = ({
  pageIndex,
  buttonLabel,
  baseUrlPath
}) => {
  return (
    <Link
      href={urlPathForPageAtIndex(pageIndex, baseUrlPath)}
      className="px-4 py-2 mx-2 sb-component-button sb-component-button-secondary"
    >
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
