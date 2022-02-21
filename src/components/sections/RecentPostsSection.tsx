import * as React from 'react';

import type * as types from 'types';
import { PostFeedSection } from './PostFeedSection';
import { sortPostsByDateDesc, resolveBlogPostLayout, filterPostLayouts } from '../../utils/static-resolver-utils';

export type Props = ReturnType<typeof resolveProps>;

export const RecentPostsSection: React.FC<Props> = (props) => {
    return <PostFeedSection {...props} />;
};

export const resolveProps = (section: types.RecentPostsSection, allDocuments: types.DocumentTypes[]) => {
    const recentPosts = filterPostLayouts(allDocuments)
        .sort(sortPostsByDateDesc)
        .slice(0, section.recentCount)
        .map((post) => resolveBlogPostLayout(post, allDocuments));

    return { ...section, posts: recentPosts };
};
