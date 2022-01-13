import { FC } from 'react';
import { allPageLayouts, allDocuments } from '.contentlayer/data';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PageLayout, Props, resolveProps } from '../components/layouts/PageLayout';

const Page: FC<Props> = (props) => {
    return <PageLayout {...props} />;
};

export default Page;

export const getStaticPaths: GetStaticPaths = () => {
    const paths = allPageLayouts.map((_) => `/${_.slug}`);

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const slug = params?.slug?.join('/') ?? '';
    const page = allPageLayouts.find((page) => page.slug === slug)!;

    const props = resolveProps(page, allDocuments);

    return { props };
};
