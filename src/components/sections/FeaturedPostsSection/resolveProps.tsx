import type * as types from 'types';

import { findPostLayouts, resolvePostLayout } from '../../../utils/static-resolver-utils';
import { Props as FeaturedPostsSectionProps } from './index';

export const resolveProps = (section: types.FeaturedPostsSection, allDocuments: types.DocumentTypes[]): FeaturedPostsSectionProps => {
    const allPosts = findPostLayouts(allDocuments);
    const posts = section.posts
        .map((postId) => allPosts.find((post) => post.__metadata.id === postId))
        .filter((post): post is types.PostLayout => !!post)
        .map((post) => {
            return resolvePostLayout(post, allDocuments);
        });

    return { ...section, posts };
};
