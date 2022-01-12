import * as React from 'react';
import { FC } from 'react';
import * as types from '.contentlayer/types';
import dayjs from 'dayjs';

import { getBaseLayoutComponent } from '../../utils/base-layout';
import getPageUrlPath from '../../utils/get-page-url-path';
import { Link } from '../atoms/Link';
import { resolveProps as resolvePropsForFeaturedPostsSection } from '../sections/FeaturedPostsSection';
import { resolveProps as resolvePropsForRecentPostsSection } from '../sections/RecentPostsSection';
import { DynamicComponent } from '../DynamicComponent';
import { mapSections } from '../sections/mapSection';

export type Props = ReturnType<typeof resolveProps>;

export const PostLayout: FC<Props> = ({ page, site }) => {
  const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
  const dateTimeAttr = dayjs(page.date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(page.date).format('MMMM D, YYYY');

  return (
    <BaseLayout page={page} site={site}>
      <main id="main" className="sb-layout sb-post-layout">
        <article className="px-4 colors-a sm:px-8 py-14 lg:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <header className="max-w-screen-md mx-auto mb-12 text-center">
              <div className="mb-4 text-lg">
                <time dateTime={dateTimeAttr} data-sb-field-path="date">
                  {formattedDate}
                </time>
              </div>
              {page.title && <h1 data-sb-field-path="title">{page.title}</h1>}
              <PostAttribution post={page} />
            </header>
            {page.body.html && (
              <div
                className="max-w-screen-md mx-auto sb-markdown"
                data-sb-field-path="markdown_content"
                dangerouslySetInnerHTML={{ __html: page.body.html }}
              />
            )}
          </div>
        </article>
        {page.bottomSections && page.bottomSections.length > 0 && (
          <div data-sb-field-path="bottomSections">
            {page.bottomSections.map((section, index) => (
              <DynamicComponent key={index} {...section} data-sb-field-path={`bottomSections.${index}`} />
            ))}
          </div>
        )}
      </main>
    </BaseLayout>
  );
};

export const resolveProps = (post: types.PostLayout, allDocuments: types.DocumentTypes[]) => {
  const config = allDocuments.filter(types.isType('Config'))[0]!;
  const bottomSections = mapSections(post.bottomSections ?? [], allDocuments);

  return {
    type: 'PostLayout' as const,
    site: { ...config, baseLayout: null },
    page: { ...post, bottomSections, baseLayout: null }
  };
};

const PostAttribution: FC<{ post: Props['page'] }> = ({ post }) => {
  if (!post.author && !post.category) {
    return null;
  }
  const category = post.category ? PostCategory(post.category) : null;
  return (
    <div className="mt-6 text-lg">
      {post.author && (
        <>
          {'By '}
          <PostAuthor author={post.author} />
        </>
      )}
      {category && (
        <>
          {post.author ? ' in ' : 'In '}
          {category}
        </>
      )}
    </div>
  );
};

const PostAuthor: FC<{ author: types.Person }> = ({ author }) => {
  const children = (
    <>
      {author.firstName && <span data-sb-field-path=".firstName">{author.firstName}</span>}{' '}
      {author.lastName && <span data-sb-field-path=".lastName">{author.lastName}</span>}
    </>
  );
  // TODO why is this condition needed?
  return author.slug ? (
    <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
      {children}
    </Link>
  ) : (
    <span data-sb-field-path="author">{children}</span>
  );
};

const PostCategory: FC<{ title: string }> = (category) => {
  return (
    <Link data-sb-field-path="category" href={getPageUrlPath(category)}>
      {category.title}
    </Link>
  );
};
