import { FC } from 'react';
// import { allPostLayouts, allPeople, allDocuments } from '.contentlayer/data';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
    resolveProps as resolvePropsForPostLayout,
    Props as PostLayoutProps
} from '../../components/layouts/PostLayout';
import {
    Props as PostFeedLayoutProps,
    resolveProps as resolvePropsForPostFeedLayout
} from '../../components/layouts/PostFeedLayout';
import { DynamicComponent } from '../../components/DynamicComponent';

type Props = PostLayoutProps | PostFeedLayoutProps;

const Page: FC<Props> = (props) => <DynamicComponent {...props} />;

export default Page;

const POSTS_PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = () => {
    const numOfPages = Math.ceil(allPostLayouts.length / POSTS_PER_PAGE);
    const paginationPaths = Array.from(new Array(numOfPages), (_, i) => `/blog/page/${i + 1}`);
    // TODO author pagination
    const authorPaths = allPeople.map((author) => `/blog/author/${author.slug}`);

    const paths = ['/blog', ...paginationPaths, ...allPostLayouts.map(({ slug }) => `/blog/${slug}`), ...authorPaths];

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const slug = params?.slug?.join('/') ?? '';
    const isFeed = slug === '' || slug.match(/page\/\d+$/) !== null || slug.match(/author\//) !== null;

    if (isFeed) {
        const props = resolvePropsForPostFeedLayout(slug, allDocuments);

        return { props };
    } else {
        const post = allPostLayouts.find((post) => post.slug === slug)!;
        const props = resolvePropsForPostLayout(post, allDocuments);

        return { props };
    }
};
