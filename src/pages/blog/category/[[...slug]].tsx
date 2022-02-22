import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_CATEGORY_URL,
    findPostLayouts,
    findCategoryBySlug,
    getPagedPathsForPagePath,
    getPaginationDataForPagePath,
    findAndSortCategoryPosts,
    isBlogCategory,
    toPageProps
} from '../../../utils/static-resolver-utils';

export type Props = PageProps<PostFeedLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostFeedLayout {...page} />;
        </BaseLayout>
    );
};

export default withRemoteDataUpdates(Page);

const DEFAULT_NUM_OF_POSTS_PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const categoriesWithSlug = documents.filter(isBlogCategory).filter((category) => category.slug);
    const allPosts = findPostLayouts(documents);
    const paths = categoriesWithSlug.reduce((paths: string[], category) => {
        const categoryPosts = allPosts.filter((post) => post.category === category.__metadata.id);
        const categoryPaths = getPagedPathsForPagePath(`${BLOG_CATEGORY_URL}/${category.slug}`, categoryPosts, DEFAULT_NUM_OF_POSTS_PER_PAGE);
        return paths.concat(categoryPaths);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_CATEGORY_URL}/${params?.slug.join('/')}`;
    const { __metadata, ...category } = findCategoryBySlug(documents, params?.slug[0]!)!;
    const categoryPosts = findAndSortCategoryPosts(documents, __metadata.id);
    const paginationData = getPaginationDataForPagePath(urlPath, categoryPosts, DEFAULT_NUM_OF_POSTS_PER_PAGE);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            __metadata,
            type: 'PostFeedLayout',
            title: `Posts in ${category.title} category`,
            postFeed: {
                type: 'PagedPostsSection',
                showAuthor: true,
                showDate: true,
                variant: 'variant-c'
            },
            ...paginationData
        },
        documents
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, documents);
    return { props };
};
