import { FC } from 'react';
import { config, postFeedLayout } from '.contentlayer/data';
import { PostFeedLayout } from '../../components/layouts';

const Page: FC = () => {
    return <PostFeedLayout />;
};

export default Page;

export const getStaticProps = async () => {
    return { props: { site: config, page: postFeedLayout } };
};
