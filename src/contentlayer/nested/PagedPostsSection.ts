import { defineNestedType } from 'contentlayer/source-files';
import { makeCommonPostsSectionFields } from './common';

export const PagedPostsSection = defineNestedType(() => ({
  name: 'PagedPostsSection',
  fields: {
    ...makeCommonPostsSectionFields(),
    colors: {
      type: 'enum',
      options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
      default: 'colors-a'
    }
  }
}));
