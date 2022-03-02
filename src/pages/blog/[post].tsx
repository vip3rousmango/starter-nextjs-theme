import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allPostLayouts, allDocuments } from '.contentlayer/data';

import type { PageProps } from '../../components/layouts';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { PostLayout, Props as PostLayoutProps } from '../../components/layouts/PostLayout';
import { BLOG_URL, toPageProps, urlPathForDocument } from '../../utils/static-resolver-utils';
import { mapProps as mapPostLayoutProps } from '../../components/layouts/PostLayout/mapProps';

export type Props = PageProps<PostLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostLayout {...page} />
        </BaseLayout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allPostLayouts.map((post) => urlPathForDocument(post));
    return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { post: string }> = async ({ params }) => {
    const urlPath = `${BLOG_URL}/${params?.post}`;
    const post = allPostLayouts.find((post) => urlPathForDocument(post) === urlPath)!;
    const postLayoutProps = await mapPostLayoutProps(post, allDocuments);
    const props = toPageProps(postLayoutProps, urlPath, allDocuments);
    return { props };
};
