import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import { PageProps } from '../components/layouts';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { PageLayout, Props as PageLayoutProps } from '../components/layouts/PageLayout';
import { findPageLayouts, pageProps, urlPathForDocument } from '../utils/static-resolver-utils';
import { resolveProps as resolvePropsForPageLayout } from '../components/layouts/PageLayout/resolveProps';

export type Props = PageProps<PageLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PageLayout {...page} />;
        </BaseLayout>
    );
};

export default withRemoteDataUpdates(Page);

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const pageLayouts = findPageLayouts(documents);
    const paths = pageLayouts.reduce((paths: string[], page) => {
        const urlPath = urlPathForDocument(page);
        return paths.concat(urlPath);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = '/' + (params?.slug || []).join('/');
    const page = findPageLayouts(documents).find((page) => urlPathForDocument(page) === urlPath)!;
    const pageLayoutProps = await resolvePropsForPageLayout(page, documents);
    const props = pageProps(pageLayoutProps, urlPath, documents);
    return { props };
};
