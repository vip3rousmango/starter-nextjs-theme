import { FC } from 'react';
import { PostFeedSection } from './PostFeedSection';
import * as types from '.contentlayer/types';

export type Props = ReturnType<typeof resolveProps>;

export const FeaturedPostsSection: FC<Props> = (props) => {
    return <PostFeedSection {...props} annotatePosts={true} />;
};

export const resolveProps = (section: types.FeaturedPostsSection, allDocuments: types.DocumentTypes[]) => {
    const allPosts = allDocuments.filter(types.isType('PostLayout'));
    const posts = section.posts.map((postId) => allPosts.find((post) => post.__metadata.id === postId)!);

    return { ...section, posts };
};
