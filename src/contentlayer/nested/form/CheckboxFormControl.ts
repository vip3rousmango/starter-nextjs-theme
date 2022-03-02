import { defineNestedType } from 'contentlayer/source-files';

export const CheckboxFormControl = defineNestedType(() => ({
    name: 'CheckboxFormControl',
    fields: {
        name: { type: 'string' },
        label: { type: 'string' },
        isRequired: { type: 'boolean' },
        width: { type: 'enum', options: ['full', '1/2'] }
    }
}));
