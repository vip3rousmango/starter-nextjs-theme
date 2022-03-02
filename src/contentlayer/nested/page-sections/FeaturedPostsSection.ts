import { defineNestedType } from 'contentlayer/source-files';
import { PostLayout } from '../..';
import { makeCommonPostsSectionFields } from '../common';

export const FeaturedPostsSection = defineNestedType(() => ({
    name: 'FeaturedPostsSection',
    fields: {
        ...makeCommonPostsSectionFields(),
        posts: { type: 'list', of: { ...PostLayout /* embedDocument: true */ }, default: defaultPosts }
    }
    // Any needed because of current TS limitation https://github.com/contentlayerdev/contentlayer/issues/87
})) as any;

const defaultPosts = ['pages/blog/post-three.md', 'pages/blog/post-two.md', 'pages/blog/post-one.md'];
