import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allAuthorPostFeedLayouts, allPeople, allPostLayouts, allDocuments } from '.contentlayer/data';

import type { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_AUTHOR_URL,
    urlPathForDocument,
    getPagedPathsForPagePath,
    findAndSortAuthorPosts,
    getPaginationDataForPagePath,
    toPageProps
} from '../../../utils/static-resolver-utils';

export type Props = PageProps<PostFeedLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostFeedLayout {...page} />
        </BaseLayout>
    );
};

export default Page;

const DEFAULT_NUM_OF_POSTS_PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allAuthorPostFeedLayouts.reduce((paths: string[], authorPostFeedLayout) => {
        const authorId = authorPostFeedLayout.author;
        const urlPath = urlPathForDocument(authorPostFeedLayout);
        const numOfItemsPerPage = authorPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
        const authorPosts = allPostLayouts.filter((post) => post.author === authorId);
        const authorPaths = getPagedPathsForPagePath(urlPath, authorPosts, numOfItemsPerPage);
        return paths.concat(authorPaths);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const urlPath = `${BLOG_AUTHOR_URL}/${params?.slug.join('/')}`;
    const authorPostFeedLayout = allAuthorPostFeedLayouts.find((authorPostFeedLayout) => urlPathForDocument(authorPostFeedLayout) === urlPath)!;
    const author = allPeople.find((person) => person._id === authorPostFeedLayout.author);
    const authorPosts = author ? findAndSortAuthorPosts(allDocuments, author._id) : [];
    const numOfItemsPerPage = authorPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, authorPosts, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            ...authorPostFeedLayout,
            type: 'PostFeedLayout',
            ...paginationData
        },
        allDocuments
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, allDocuments);
    return { props };
};
