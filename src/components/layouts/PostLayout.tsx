import * as React from 'react';
import { FC } from 'react';
import * as types from '.contentlayer/types';
import dayjs from 'dayjs';

import { getBaseLayoutComponent } from '../../utils/base-layout';
import { Link } from '../atoms/Link';
import { DynamicComponent } from '../DynamicComponent';
import { mapSections } from '../sections/mapSection';
import { Markdown } from '../Markdown';
import { resolveBlogPostLayout } from '../../utils/data-helpers';

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
                        {page.markdown_content && (
                            <Markdown className="max-w-screen-md mx-auto sb-markdown" fieldName="markdown_content" text={page.markdown_content} />
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
    return {
        type: 'PostLayout' as const,
        site: { ...config, baseLayout: null },
        page: {
            ...resolveBlogPostLayout(post, allDocuments),
            bottomSections: mapSections(post.bottomSections ?? [], allDocuments),
            baseLayout: null
        }
    };
};

const PostAttribution: FC<{ post: Props['page'] }> = ({ post }) => {
    if (!post.author && !post.category) {
        return null;
    }
    return (
        <div className="mt-6 text-lg">
            {post.author && (
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

const PostCategory: FC<{ category: types.BlogCategory }> = ({ category }) => {
    return (
        <Link data-sb-field-path="category" href={`/blog/category/${category.slug}`}>
            {category.title}
        </Link>
    );
};
