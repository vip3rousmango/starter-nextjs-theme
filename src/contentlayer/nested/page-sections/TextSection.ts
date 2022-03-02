import { defineNestedType } from 'contentlayer/source-files';
import { makeCommontSectionFields } from './common';

export const TextSection = defineNestedType(() => ({
    name: 'TextSection',
    fields: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        text: { type: 'markdown' },
        styles: { type: 'json' },
        ...makeCommontSectionFields()
    }
}));
