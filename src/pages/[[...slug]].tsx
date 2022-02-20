import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { PageProps } from '../components/layouts';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { getBaseLayoutComponent } from '../utils/base-layout';
import { DynamicComponent } from '../components/DynamicComponent';

const Page: FC<PageProps> = (props) => {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout!, site.baseLayout!);
    return (
        <BaseLayout site={site} page={page}>
            <DynamicComponent {...page} />;
        </BaseLayout>
    );
};

export default withRemoteDataUpdates(Page);

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const paths = resolveStaticPaths(data.objects);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const urlPath = '/' + (params?.slug || []).join('/');
    const props = await resolveStaticProps(urlPath, data.objects);
    return { props };
};
