import { defineNestedType } from 'contentlayer/source-files';
import { makeCommonPostsSectionFields } from './common';
import { Button } from './Button';
import { Link } from './Link';

export const PagedPostsSection = defineNestedType(() => ({
    name: 'PagedPostsSection',
    fields: {
        ...makeCommonPostsSectionFields(),
        actions: {
            type: 'list',
            of: [Button, Link],
            default: []
        },
    }
}));
