import * as React from 'react';
import dayjs from 'dayjs';

import { getBaseLayoutComponent } from '../../utils/base-layout';
import { getComponent } from '../components-registry';
import getPageUrlPath from '../../utils/get-page-url-path';
import Link from '../atoms/Link';
import { FC } from 'react';
import type * as types from '.contentlayer/types';
import { TMPBaseLayout } from '../../tmp';
import { PostFeedSection } from '../sections/PostFeedSection';

export type Props = {
  page: types.PostLayout & TMPBaseLayout;
  site: types.Config & TMPBaseLayout;
  recentPosts: types.PostLayout[];
};

export const PostLayout: FC<Props> = (props) => {
  const { page, site } = props;
  const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
  const sections = page.bottomSections ?? [];
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
        {sections.length > 0 && (
          <div data-sb-field-path="bottomSections">
            {sections.map((section, index) => {
              switch (section.type) {
                case 'RecentPostsSection':
                  return (
                    <PostFeedSection
                      key={index}
                      {...section}
                      posts={props.recentPosts}
                      data-sb-field-path={`bottomSections.${index}`}
                    />
                  );
                default:
                  throw new Error(`no component matching the page section's type: ${section.type}`);
              }
              // console.log({ section });

              // const Component = getComponent(section.type);
              // if (!Component) {
              //   throw new Error(`no component matching the page section's type: ${section.type}`);
              // }
              // return <Component key={index} {...section} data-sb-field-path={`bottomSections.${index}`} />;
            })}
          </div>
        )}
      </main>
    </BaseLayout>
  );
};

const PostAttribution: FC<{ post: types.PostLayout }> = ({ post }) => {
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
