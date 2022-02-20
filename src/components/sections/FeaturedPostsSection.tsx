import * as React from 'react';

import type * as types from 'types';
import { PostFeedSection } from './PostFeedSection';
import { filterPostLayouts, resolveBlogPostLayout } from '../../utils/static-resolver-utils';

export type Props = ReturnType<typeof resolveProps>;

export const FeaturedPostsSection: React.FC<Props> = (props) => {
    return <PostFeedSection {...props} annotatePosts={true} />;
};

export const resolveProps = (section: types.FeaturedPostsSection, allDocuments: types.DocumentTypes[]) => {
    const allPosts = filterPostLayouts(allDocuments);
    const posts = section.posts
        .map((postId) => allPosts.find((post) => post.__metadata.id === postId))
        .filter((post): post is types.PostLayout => !!post)
        .map((post) => {
            return resolveBlogPostLayout(post, allDocuments);
        });

    return { ...section, posts };
};
