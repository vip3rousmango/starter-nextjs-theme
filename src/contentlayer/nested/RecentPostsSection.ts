import { defineNestedType } from 'contentlayer/source-files';

export const RecentPostsSection = defineNestedType(() => ({
    name: 'RecentPostsSection',
    fields: {
        title: {
            type: 'string',
            default: 'Recent Posts'
        },
        subtitle: {
            type: 'string',
            default: 'Lastest blog posts section example'
        },
        colors: {
            type: 'string',
            default: 'colors-h'
        },
        recentCount: {
            type: 'number',
            default: 6
        }
    }
}));
