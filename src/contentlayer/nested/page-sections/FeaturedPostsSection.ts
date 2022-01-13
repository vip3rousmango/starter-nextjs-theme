import { defineNestedType } from 'contentlayer/source-files';
import { PostLayout } from '../..';
import { colors } from '../../common';
import { makeCommonPostsSectionFields } from '../common';
import { Styles } from '../Styles';

export const FeaturedPostsSection = defineNestedType(() => ({
    name: 'FeaturedPostsSection',
    fields: {
        ...makeCommonPostsSectionFields(),
        colors,
        posts: { type: 'list', of: { ...PostLayout /* embedDocument: true */ }, default: defaultPosts },
        styles: {
            type: 'nested',
            of: Styles,
            default: {}
        }
    }
    // Any needed because of current TS limitation https://github.com/contentlayerdev/contentlayer/issues/87
})) as any;

const defaultPosts = ['pages/blog/post-three.md', 'pages/blog/post-two.md', 'pages/blog/post-one.md'];
