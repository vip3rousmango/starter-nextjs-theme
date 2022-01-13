import { PostFeedSection } from './PostFeedSection';
import * as types from '.contentlayer/types';
import { sortPostsByDateDesc } from '../../utils/data-helpers';
import { FC } from 'react';

export const RecentPostsSection: FC<Props> = (props) => <PostFeedSection {...props} />;

export type Props = ReturnType<typeof resolveProps>;

export const resolveProps = (section: types.RecentPostsSection, allDocuments: types.DocumentTypes[]) => {
    const allPosts = allDocuments.filter(types.isType('PostLayout'));
    const recentPosts = allPosts.sort(sortPostsByDateDesc).slice(0, section.recentCount);

    return { ...section, posts: recentPosts };
};
