import { defineDocumentType } from 'contentlayer/source-files';
import { Person } from './Person';
import { makePostFeedLayoutFields } from './common';

export const AuthorPostFeedLayout = defineDocumentType(() => ({
    name: 'AuthorPostFeedLayout',
    fields: {
        author: {
            type: 'reference',
            of: Person,
            required: true
        },
        ...makePostFeedLayoutFields()
    }
}));
