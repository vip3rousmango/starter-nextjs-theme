import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { allPageLayouts, allDocuments } from '.contentlayer/data';

import type { PageProps } from '../components/layouts';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { PageLayout, Props as PageLayoutProps } from '../components/layouts/PageLayout';
import { toPageProps, urlPathForDocument } from '../utils/static-resolver-utils';
import { mapProps as mapPageLayoutProps } from '../components/layouts/PageLayout/mapProps';

export type Props = PageProps<PageLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PageLayout {...page} />
        </BaseLayout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allPageLayouts.map((page) => urlPathForDocument(page));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const urlPath = '/' + (params?.slug || []).join('/');
    const page = allPageLayouts.find((page) => urlPathForDocument(page) === urlPath)!;
    const pageLayoutProps = await mapPageLayoutProps(page, allDocuments);
    const props = toPageProps(pageLayoutProps, urlPath, allDocuments);
    return { props };
};
