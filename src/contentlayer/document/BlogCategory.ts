import { defineDocumentType } from 'contentlayer/source-files';

export const BlogCategory = defineDocumentType(() => ({
    name: 'BlogCategory',
    fields: {
        title: { type: 'string', required: true }
    }
}));
