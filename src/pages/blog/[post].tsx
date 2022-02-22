import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import { PageProps } from '../../components/layouts';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { PostLayout, Props as PostLayoutProps } from '../../components/layouts/PostLayout';
import { BLOG_URL, findPostLayouts, urlPathForDocument, pageProps } from '../../utils/static-resolver-utils';
import { resolveProps as resolvePropsForPostLayout } from '../../components/layouts/PostLayout/resolveProps';

export type Props = PageProps<PostLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostLayout {...page} />;
        </BaseLayout>
    );
};

export default withRemoteDataUpdates(Page);

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const allPosts = findPostLayouts(documents);
    const paths = allPosts.reduce((paths: string[], post) => {
        const urlPath = urlPathForDocument(post);
        return paths.concat(urlPath);
    }, []);
    return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { post: string }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_URL}/${params?.post}`;
    const post = findPostLayouts(documents).find((post) => urlPathForDocument(post) === urlPath)!;
    const postLayoutProps = await resolvePropsForPostLayout(post, documents);
    const props = pageProps(postLayoutProps, urlPath, documents);
    return { props };
};
