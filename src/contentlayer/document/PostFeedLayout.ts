import { defineDocumentType } from 'contentlayer/source-files';
import { makePostFeedLayoutFields } from './common';

export const PostFeedLayout = defineDocumentType(() => ({
    name: 'PostFeedLayout',
    bodyType: 'none',
    isSingleton: true,
    fields: {
        ...makePostFeedLayoutFields()
    }
}));
