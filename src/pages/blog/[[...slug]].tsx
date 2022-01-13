import { FC } from 'react';
// import { allPostLayouts, allPeople, allDocuments } from '.contentlayer/data';
import * as types from '.contentlayer/types';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { resolveProps as resolvePropsForPostLayout, Props as PostLayoutProps } from '../../components/layouts/PostLayout';
import { Props as PostFeedLayoutProps, resolveProps as resolvePropsForPostFeedLayout } from '../../components/layouts/PostFeedLayout';
import { DynamicComponent } from '../../components/DynamicComponent';

type Props = PostLayoutProps | PostFeedLayoutProps;

const Page: FC<Props> = (props) => <DynamicComponent {...props} />;

export default Page;

const POSTS_PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();

    const allPostLayouts = data.pages.filter(types.isType('PostLayout'));
    const postLayoutSlugs = allPostLayouts.map((_) => _.__metadata.urlPath);

    // TODO author pagination
    // const authorPaths = allPeople.map((author) => `/blog/author/${author.slug}`);
    const authorPaths: string[] = [];

    const postFeedLayouts: types.PostFeedLayout = data.pages.filter((page) => types.isType('PostFeedLayout'))[0];
    let paginationPaths: string[] = [];
    if (postFeedLayouts) {
        const numOfPostsPerPage = postFeedLayouts.numOfPostsPerPage;
        if (numOfPostsPerPage > 0) {
            const allPosts = data.pages.filter(types.isType('PostLayout'));
            const numOfPages = Math.ceil(allPosts.length / numOfPostsPerPage) || 1;
            paginationPaths = Array.from(new Array(numOfPages), (_, i) => `/blog/page/${i + 1}`);
        }
    }

    const paths = ['/blog', ...paginationPaths, ...postLayoutSlugs, ...authorPaths];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const slug = params?.slug?.join('/') ?? '';
    const isFeed = slug === '' || slug.match(/page\/\d+$/) !== null || slug.match(/author\//) !== null;
    const data = await sourcebitDataClient.getData();

    if (isFeed) {
        const props = resolvePropsForPostFeedLayout(slug, data.objects);

        return { props };
    } else {
        const urlPath = '/' + slug;
        const post = data.pages.find((post) => post.__metadata.urlPath === urlPath)!;
        const props = resolvePropsForPostLayout(post, data.objects);

        return { props };
    }
};
