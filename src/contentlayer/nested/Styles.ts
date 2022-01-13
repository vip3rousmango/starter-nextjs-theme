import { defineNestedType } from 'contentlayer/source-files';

export const Styles = defineNestedType(() => ({
    name: 'Styles',
    fields: {
        self: { type: 'json' },
        title: { type: 'json' },
        text: { type: 'json' },
        subtitle: { type: 'json' },
        actions: { type: 'json' },
        quote: { type: 'json' },
        name: { type: 'json' },
        answer: { type: 'json' },
        submitLabel: { type: 'json' },
        question: { type: 'json' }
    }
}));
