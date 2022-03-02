import { defineNestedType } from 'contentlayer/source-files';
import { makeCommonPostsSectionFields } from './common';

export const PagedPostsSection = defineNestedType(() => ({
    name: 'PagedPostsSection',
    fields: {
        ...makeCommonPostsSectionFields()
    }
}));
