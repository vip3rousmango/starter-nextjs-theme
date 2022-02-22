import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { toFieldPath, toObjectId, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Link } from '../../atoms/Link';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import ArrowRightIcon from '../../svgs/arrow-right';

export type Props = {
    title?: string;
    subtitle?: string;
    elementId?: string;
    colors?: string;
    variant?: 'variant-a' | 'variant-b' | 'variant-c';
    styles?: types.Styles;
    pageLinks?: React.ReactNode;
    posts?: PostFeedSectionPostsProps[];
    annotatePosts?: boolean;
    showDate?: boolean;
    showExcerpt?: boolean;
    showAuthor?: boolean;
    actions?: (types.Button | types.Link)[];
};

export type PostFeedSectionPostsProps = Omit<types.PostLayout, 'author' | 'category'> & {
    author?: PersonProps;
    category?: CategoryProps;
};

export type PersonProps = types.Person & { pageUrl?: string };
export type CategoryProps = types.BlogCategory & { pageUrl?: string };

export const PostFeedSection: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const sectionStyles = props.styles?.self ?? {};
    const sectionWidth = sectionStyles.width ?? 'wide';
    const sectionHeight = sectionStyles.height ?? 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent ?? 'center';
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
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
                borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : undefined
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

const PostFeedHeader: React.FC<Props> = (props) => {
    if (!props.title && !props.subtitle) {
        return null;
    }
    const styles = props.styles ?? ({} as any);
    return (
        <div>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {props.title}
                </h2>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-6': props.title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {props.subtitle}
                </p>
            )}
        </div>
    );
};

const PostFeedActions: React.FC<Props> = (props) => {
    const actions = props.actions ?? [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles ?? ({} as types.Styles);
    return (
        <div className="mt-12 overflow-x-hidden">
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                {...toFieldPath('.actions')}
            >
                {props.actions?.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};

const PostFeedVariants: React.FC<Props> = (props) => {
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

const PostsVariantA: React.FC<Props> = (props) => {
    const posts = props.posts ?? [];
    if (posts.length === 0) {
        return null;
    }

    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-3', 'lg:gap-x-8', {
                'mt-12': props.title || props.subtitle
            })}
            {...(props.annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => (
                <article key={index} {...toObjectId(post.__metadata.id)}>
                    <Link href={post.__metadata.urlPath} className="block">
                        {post.featuredImage && (
                            <div className="rounded-2xl mb-6 h-0 w-full pt-1/1 relative overflow-hidden lg:mb-10">
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    {...toFieldPath('featuredImage')}
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" {...toFieldPath('title')}>
                                {post.title}
                            </h3>
                            {props.showDate && <PostDate post={post} className="mt-2" />}
                            {props.showExcerpt && post.excerpt && (
                                <p className="mt-6" {...toFieldPath('excerpt')}>
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution
                                showAuthor={props.showAuthor}
                                post={post}
                                className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
                            />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
};

const PostsVariantB: React.FC<Props> = (props) => {
    const posts = props.posts ?? [];
    if (posts.length === 0) {
        return null;
    }

    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-5', 'lg:gap-x-8', {
                'mt-12': props.title || props.subtitle
            })}
            {...(props.annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => (
                <article
                    key={index}
                    className={classNames(index % 4 === 0 || (index + 1) % 4 === 0 ? 'md:col-span-3' : 'md:col-span-2')}
                    {...toObjectId(post.__metadata.id)}
                >
                    <Link href={post.__metadata.urlPath} className="block">
                        {post.featuredImage && (
                            <div
                                className="rounded-2xl mb-6 h-0 w-full pt-9/16 relative overflow-hidden md:pt-0 md:h-64 lg:h-96 lg:mb-10"
                                {...toFieldPath('featuredImage')}
                            >
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" {...toFieldPath('title')}>
                                {post.title}
                            </h3>
                            {props.showDate && <PostDate post={post} className="mt-2" />}
                            {props.showExcerpt && post.excerpt && (
                                <p className="mt-6" {...toFieldPath('excerpt')}>
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution
                                showAuthor={props.showAuthor}
                                post={post}
                                className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
                            />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
};

const PostsVariantC: React.FC<Props> = (props) => {
    const posts = props.posts ?? [];
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', {
                'mt-12': props.title || props.subtitle
            })}
            {...(props.annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => {
                return (
                    <article key={index} className="sb-card rounded-2xl overflow-hidden" {...toObjectId(post.__metadata.id)}>
                        <Link href={post.__metadata.urlPath} className="block">
                            <div className="flex flex-col min-h-full">
                                {post.featuredImage && (
                                    <div className="h-0 w-full pt-9/16 relative overflow-hidden" {...toFieldPath('featuredImage')}>
                                        <ImageBlock
                                            {...post.featuredImage}
                                            className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col flex-grow px-4 pt-6 pb-8 sm:px-6">
                                    <div className="flex-grow">
                                        {props.showDate && <PostDate post={post} className="mb-2" />}
                                        <h3 className="text-2xl" {...toFieldPath('title')}>
                                            {post.title}
                                        </h3>
                                        <PostAttribution showAuthor={props.showAuthor} post={post} className="mt-2" />
                                        {props.showExcerpt && post.excerpt && (
                                            <p className="mt-3" {...toFieldPath('excerpt')}>
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <div className="sb-component sb-component-block sb-component-link">
                                            <span>Read post</span>
                                            <ArrowRightIcon className="fill-current h-5 w-5 ml-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                );
            })}
        </div>
    );
};

const PostDate: React.FC<{ post: PostFeedSectionPostsProps; className?: string }> = ({ post, className = '' }) => {
    if (!post.date) {
        return null;
    }
    const date = post.date;
    const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(date).format('MMMM D, YYYY');
    return (
        <div className={className}>
            <time dateTime={dateTimeAttr} {...toFieldPath('date')}>
                {formattedDate}
            </time>
        </div>
    );
};

const PostAttribution: React.FC<{ showAuthor?: boolean; post: PostFeedSectionPostsProps; className?: string }> = ({ showAuthor, post, className = '' }) => {
    if (!post.author && !post.category) {
        return null;
    }
    return (
        <div className={className}>
            {showAuthor && post.author && (
                <>
                    {'By '}
                    <PostAuthor author={post.author} />
                </>
            )}
            {post.category && (
                <>
                    {post.author ? ' in ' : 'In '}
                    <PostCategory category={post.category} />
                </>
            )}
        </div>
    );
};

const PostAuthor: React.FC<{ author: PersonProps }> = ({ author }) => {
    if (!author) {
        return null;
    }
    const children = (
        <>
            {author.firstName && <span {...toFieldPath('.firstName')}>{author.firstName}</span>}{' '}
            {author.lastName && <span {...toFieldPath('.lastName')}>{author.lastName}</span>}
        </>
    );
    if (author.pageUrl) {
        return (
            <Link {...toFieldPath('author')} href={author.pageUrl}>
                {children}
            </Link>
        );
    } else {
        return <span {...toFieldPath('author')}>{children}</span>;
    }
};

const PostCategory: React.FC<{ category: CategoryProps }> = ({ category }) => {
    if (!category) {
        return null;
    }
    return category.pageUrl ? (
        <Link {...toFieldPath('category')} href={category.pageUrl}>
            {category.title}
        </Link>
    ) : (
        <span {...toFieldPath('category')}>{category.title}</span>
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
