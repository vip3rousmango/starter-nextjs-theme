import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allCategoryPostFeedLayouts, allBlogCategories, allPostLayouts, allDocuments } from '.contentlayer/data';

import type { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_CATEGORY_URL,
    urlPathForDocument,
    getPagedPathsForPagePath,
    findAndSortCategoryPosts,
    getPaginationDataForPagePath,
    toPageProps,
    getRootPagePath
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

/**
 * Returns URL paths for the paginated blog category pages in the
 * '/blog/category/{category}/page/{N}' format.
 * The 'category' is the category id inferred from the file name, and the 'N'
 * is the page number starting with 2. The URL path of the first page is always
 * the '/blog/category/{category}'.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout` with
 * category "react", this function will return following URL paths:
 * ['/blog/category/react', '/blog/category/react/page/2', '/blog/category/react/page/3']
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allCategoryPostFeedLayouts.reduce((paths: string[], categoryPostFeedLayout) => {
        const categoryId = categoryPostFeedLayout.category;
        const urlPath = urlPathForDocument(categoryPostFeedLayout);
        const numOfItemsPerPage = categoryPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
        const categoryPosts = allPostLayouts.filter((post) => post.category === categoryId);
        const categoryPaths = getPagedPathsForPagePath(urlPath, categoryPosts, numOfItemsPerPage);
        return paths.concat(categoryPaths);
    }, []);
    return { paths, fallback: false };
};

/**
 * Returns props for a paginated blog category page.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout` with
 * category "react", and the rendered page is '/blog/category/react/page/2',
 * this method will return props for `PostFeedLayout` with `PostLayout` items
 * sorted by date at indexes 4 to 7.
 *
 * @param params
 */
export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const urlPath = `${BLOG_CATEGORY_URL}/${params?.slug.join('/')}`;
    const categoryPostFeedLayout = allCategoryPostFeedLayouts.find(
        (categoryPostFeedLayout) => urlPathForDocument(categoryPostFeedLayout) === getRootPagePath(urlPath)
    )!;
    const category = allBlogCategories.find((category) => category._id === categoryPostFeedLayout.category);
    const categoryPosts = category ? findAndSortCategoryPosts(allDocuments, category._id) : [];
    const numOfItemsPerPage = categoryPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, categoryPosts, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            ...categoryPostFeedLayout,
            type: 'PostFeedLayout',
            ...paginationData
        },
        allDocuments
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, allDocuments);
    return { props };
};
