import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../utils/get-data-attrs';
import { Link, Action } from '../atoms';
import ImageBlock from '../blocks/ImageBlock';
import ArrowRightIcon from '../svgs/arrow-right';
import getPageUrlPath from '../../utils/get-page-url-path';
import type * as types from '.contentlayer/types';
import { FC } from 'react';

type PostFeedSection = types.PagedPostsSection | types.RecentPostsSection | types.FeaturedPostsSection;
type Props = PostFeedSection & {
  posts: types.PostLayout[];
  elementId?: string; // TODO REMOVE
  pageLinks?: React.ReactNode;
  annotatePosts?: boolean;
};

export const PostFeedSection: FC<Props> = (props) => {
  const cssId = props.elementId ?? null;
  const colors = props.colors ?? 'colors-a';
  const sectionStyles = props.styles?.self ?? {};
  const sectionWidth = sectionStyles.width ?? 'wide';
  const sectionHeight = sectionStyles.height ?? 'auto';
  const sectionJustifyContent = sectionStyles.justifyContent ?? 'center';
  return (
    <div
      id={cssId}
      {...getDataAttrs(props)}
      className={classNames(
        'sb-component',
        'sb-component-section',
        'sb-component-post-feed-section',
        colors,
        'flex',
        'flex-col',
        'justify-center',
        'relative',
        mapMinHeightStyles(sectionHeight),
        sectionStyles.margin,
        sectionStyles.padding ?? 'py-12 px-4',
        sectionStyles.borderColor,
        sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
        sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none'
      )}
      style={{
        borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
      }}
    >
      <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
        <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
          <PostFeedHeader {...props} />
          <PostFeedVariants {...props} />
          <PostFeedActions {...props} />
          {props.pageLinks}
        </div>
      </div>
    </div>
  );
};

const PostFeedHeader: FC<PostFeedSection> = (props) => {
  if (!props.title && !props.subtitle) {
    return null;
  }
  const styles = props.styles ?? ({} as any);
  return (
    <div>
      {props.title && (
        <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
          {props.title}
        </h2>
      )}
      {props.subtitle && (
        <p
          className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
            'mt-6': props.title
          })}
          data-sb-field-path=".subtitle"
        >
          {props.subtitle}
        </p>
      )}
    </div>
  );
};

const PostFeedActions: FC<Props> = (props) => {
  const actions = props.actions ?? [];
  if (actions.length === 0) {
    return null;
  }
  const styles = props.styles ?? ({} as types.Styles);
  return (
    <div className="mt-12 overflow-x-hidden">
      <div
        className={classNames(
          'flex',
          'flex-wrap',
          'items-center',
          '-mx-2',
          styles.actions ? mapStyles(styles.actions) : null
        )}
        data-sb-field-path=".actions"
      >
        {props.actions.map((action, index) => (
          <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
        ))}
      </div>
    </div>
  );
};

const PostFeedVariants: FC<Props> = (props) => {
  const variant = props.variant ?? 'variant-a';
  switch (variant) {
    case 'variant-a':
      return <PostsVariantA {...props} />;
    case 'variant-b':
      return <PostsVariantB {...props} />;
    case 'variant-c':
      return <PostsVariantC {...props} />;
    default:
      return null;
  }
};

const PostsVariantA: FC<Props> = (props) => {
  const posts = props.posts ?? [];
  if (posts.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-3', 'lg:gap-x-8', {
        'mt-12': props.title || props.subtitle
      })}
      {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
    >
      {posts.map((post, index) => (
        <article key={index} data-sb-object-id={post._id}>
          {post.featuredImage && (
            <Link
              href={getPageUrlPath(post)}
              className="relative block w-full h-0 mb-6 overflow-hidden rounded-2xl pt-1/1 lg:mb-10"
              data-sb-field-path="featuredImage"
            >
              <ImageBlock
                {...post.featuredImage}
                className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </Link>
          )}
          <div>
            <h3 className="text-2xl">
              <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                {post.title}
              </Link>
            </h3>
            {props.showDate && <PostDate post={post} className="mt-2" />}
            {props.showExcerpt && post.excerpt && (
              <p className="mt-6" data-sb-field-path="excerpt">
                {post.excerpt}
              </p>
            )}
            <PostAttribution
              showAuthor={props.showAuthor}
              post={post}
              className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

const PostsVariantB: FC<Props> = (props) => {
  const posts = props.posts ?? [];
  if (posts.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-5', 'lg:gap-x-8', {
        'mt-12': props.title || props.subtitle
      })}
      {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
    >
      {posts.map((post, index) => (
        <article
          key={index}
          className={classNames(index % 4 === 0 || (index + 1) % 4 === 0 ? 'md:col-span-3' : 'md:col-span-2')}
          data-sb-object-id={post._id}
        >
          {post.featuredImage && (
            <Link
              href={getPageUrlPath(post)}
              className="relative block w-full h-0 mb-6 overflow-hidden rounded-2xl pt-9/16 md:pt-0 md:h-64 lg:h-96 lg:mb-10"
              data-sb-field-path="featuredImage"
            >
              <ImageBlock
                {...post.featuredImage}
                className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </Link>
          )}
          <div>
            <h3 className="text-2xl">
              <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                {post.title}
              </Link>
            </h3>
            {props.showDate && <PostDate post={post} className="mt-2" />}
            {props.showExcerpt && post.excerpt && (
              <p className="mt-6" data-sb-field-path="excerpt">
                {post.excerpt}
              </p>
            )}
            <PostAttribution
              showAuthor={props.showAuthor}
              post={post}
              className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

const PostsVariantC: FC<Props> = (props) => {
  const posts = props.posts ?? [];
  if (posts.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', { 'mt-12': props.title || props.subtitle })}
      {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
    >
      {posts.map((post, index) => {
        return (
          <article key={index} className="overflow-hidden sb-card rounded-2xl" data-sb-object-id={post._id}>
            <div className="flex flex-col min-h-full">
              {post.featuredImage && (
                <Link
                  href={getPageUrlPath(post)}
                  className="relative block w-full h-0 overflow-hidden pt-9/16"
                  data-sb-field-path="featuredImage"
                >
                  <ImageBlock
                    {...post.featuredImage}
                    className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              )}
              <div className="flex flex-col flex-grow px-4 pt-6 pb-8 sm:px-6">
                <div className="flex-grow">
                  {props.showDate && <PostDate post={post} className="mb-2" />}
                  <h3 className="text-2xl">
                    <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                      {post.title}
                    </Link>
                  </h3>
                  <PostAttribution showAuthor={props.showAuthor} post={post} className="mt-2" />
                  {props.showExcerpt && post.excerpt && (
                    <p className="mt-3" data-sb-field-path="excerpt">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div className="mt-3">
                  <Link href={getPageUrlPath(post)} className="sb-component sb-component-block sb-component-link">
                    <span>Read post</span>
                    <ArrowRightIcon className="w-5 h-5 ml-3 fill-current" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const PostDate: FC<{ post: types.PostLayout; className?: string }> = ({ post, className = '' }) => {
  if (!post.date) {
    return null;
  }
  const date = post.date;
  const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(date).format('MMMM D, YYYY');
  return (
    <div className={className}>
      <time dateTime={dateTimeAttr} data-sb-field-path="date">
        {formattedDate}
      </time>
    </div>
  );
};

const PostAttribution: FC<{ showAuthor: boolean; post: types.PostLayout; className?: string }> = ({
  showAuthor,
  post,
  className = ''
}) => {
  const author = showAuthor ? PostAuthor(post) : null;
  const category = postCategory(post);
  if (!author && !category) {
    return null;
  }
  return (
    <div className={className}>
      {author && (
        <>
          {'By '}
          {author}
        </>
      )}
      {category && (
        <>
          {author ? ' in ' : 'In '}
          {category}
        </>
      )}
    </div>
  );
};

const PostAuthor: FC<types.PostLayout> = (post) => {
  if (!post.author) {
    return null;
  }
  const author = post.author;
  const children = (
    <>
      {author.firstName && <span data-sb-field-path=".firstName">{author.firstName}</span>}{' '}
      {author.lastName && <span data-sb-field-path=".lastName">{author.lastName}</span>}
    </>
  );
  if (author.slug) {
    return (
      <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
        {children}
      </Link>
    );
  } else {
    return <span data-sb-field-path="author">{children}</span>;
  }
};

const postCategory: FC<types.PostLayout> = (post) => {
  if (!post.category) {
    return null;
  }
  const category = post.category;
  return (
    <Link data-sb-field-path="category" href={getPageUrlPath(category)}>
      {category.title}
    </Link>
  );
};

function mapMinHeightStyles(height: string) {
  switch (height) {
    case 'auto':
      return 'min-h-0';
    case 'screen':
      return 'min-h-screen';
    default:
      return null;
  }
}

function mapMaxWidthStyles(width: string) {
  switch (width) {
    case 'narrow':
      return 'max-w-screen-md';
    case 'wide':
      return 'max-w-screen-xl';
    case 'full':
      return 'max-w-full';
    default:
      return null;
  }
}
