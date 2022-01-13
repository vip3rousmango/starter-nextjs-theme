import { FC } from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PageLayout, Props, resolveProps } from '../components/layouts/PageLayout';

const Page: FC<Props> = (props) => {
    return <PageLayout {...props} />;
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const paths = data.pages.map((page) => page.__metadata?.urlPath);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const urlPath = '/' + (params?.slug || []).join('/');
    const page = data.pages.find((page) => page.__metadata.urlPath === urlPath);
    const props = resolveProps(page, data.objects);

    // console.log(JSON.stringify(props, null, 2));

    return { props };
};
