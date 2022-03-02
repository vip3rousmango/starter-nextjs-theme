import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allPostLayouts, allDocuments } from '.contentlayer/data';

import type { PageProps } from '../../components/layouts';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_URL,
    findPostFeedLayout,
    getPagedPathsForPagePath,
    getPaginationDataForPagePath,
    toPageProps,
    sortPostsByDateDesc
} from '../../utils/static-resolver-utils';

export type Props = PageProps<PostFeedLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostFeedLayout {...page} annotateFields={true} />
        </BaseLayout>
    );
};

export default Page;

const DEFAULT_NUM_OF_POSTS_PER_PAGE = 10;

/**
 * Returns URL paths for the paginated blog pages in the '/blog/page/{N}' format.
 * The 'N' is the page number starting with 2. The URL path of the first page is
 * always the '/blog'.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout`,
 * this function will return following URL paths:
 * ['/blog', '/blog/page/2', '/blog/page/3']
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const postFeedLayout = findPostFeedLayout(allDocuments);
    if (!postFeedLayout) {
        return { paths: [], fallback: false };
    }
    const numOfItemsPerPage = postFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paths = getPagedPathsForPagePath(BLOG_URL, allPostLayouts, numOfItemsPerPage);
    return { paths, fallback: false };
};

/**
 * Returns props for a paginated blog page.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout`, and
 * the rendered page is '/blog/page/2', this method will return props for
 * `PostFeedLayout` with `PostLayout` items sorted by date at indexes 4 to 7.
 *
 * @param params
 */
export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const pageNumber = (params?.slug || []).join('/');
    const urlPath = BLOG_URL + (pageNumber ? `/${pageNumber}` : '');
    const postFeedLayout = findPostFeedLayout(allDocuments)!;
    const allPostsSorted = allPostLayouts.sort(sortPostsByDateDesc);
    const numOfItemsPerPage = postFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, allPostsSorted, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            ...postFeedLayout,
            ...paginationData
        },
        allDocuments
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, allDocuments);
    return { props };
};
