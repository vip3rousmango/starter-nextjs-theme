import { defineDocumentType } from 'contentlayer/source-files';
import { BlogCategory } from './BlogCategory';
import { makePostFeedLayoutFields } from './common';

export const CategoryPostFeedLayout = defineDocumentType(() => ({
    name: 'CategoryPostFeedLayout',
    fields: {
        category: {
            type: 'reference',
            of: BlogCategory,
            required: true
        },
        ...makePostFeedLayoutFields()
    }
}));
