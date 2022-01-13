import { defineNestedType } from 'contentlayer/source-files';

export const TextareaFormControl = defineNestedType(() => ({
    name: 'TextareaFormControl',
    fields: {
        name: { type: 'string' },
        label: { type: 'string' },
        hideLabel: { type: 'boolean' },
        placeholder: { type: 'string' },
        isRequired: { type: 'boolean' },
        width: { type: 'enum', options: ['full', '1/2'] }
    }
}));
