import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const Badge = defineNestedType(() => ({
    name: 'Badge',
    fields: {
        label: { type: 'string' },
        elementId,
        styles: { type: 'json' }
    }
}));
