import { defineNestedType } from 'contentlayer/source-files';
import { makeCommonPostsSectionFields } from './common';

export const RecentPostsSection = defineNestedType(() => ({
  name: 'RecentPostsSection',
  fields: {
    ...makeCommonPostsSectionFields(),
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
