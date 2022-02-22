import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_AUTHOR_URL,
    findPostLayouts,
    findPersonBySlug,
    findAndSortAuthorPosts,
    getPagedPathsForPagePath,
    getPaginationDataForPagePath,
    toPageProps,
    isPerson
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
    const authorsWithSlug = documents.filter(isPerson).filter((person) => person.slug);
    const allPosts = findPostLayouts(documents);
    const paths = authorsWithSlug.reduce((paths: string[], author) => {
        const authorPosts = allPosts.filter((post) => post.author === author.__metadata.id);
        const authorPaths = getPagedPathsForPagePath(`${BLOG_AUTHOR_URL}/${author.slug}`, authorPosts, DEFAULT_NUM_OF_POSTS_PER_PAGE);
        return paths.concat(authorPaths);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_AUTHOR_URL}/${params?.slug.join('/')}`;
    const { __metadata, ...author } = findPersonBySlug(documents, params?.slug[0]!)!;
    const authorPosts = findAndSortAuthorPosts(documents, __metadata.id);
    const paginationData = getPaginationDataForPagePath(urlPath, authorPosts, DEFAULT_NUM_OF_POSTS_PER_PAGE);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            __metadata,
            type: 'PostFeedLayout',
            title: `Posts by ${author.firstName} ${author.lastName}`,
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
