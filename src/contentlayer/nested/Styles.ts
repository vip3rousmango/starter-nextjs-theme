import { defineNestedType } from 'contentlayer/source-files';

export const Styles = defineNestedType(() => ({
    name: 'Styles',
    fields: {
        self: { type: 'json' }
    }
}));
