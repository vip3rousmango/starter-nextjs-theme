import { defineNestedType } from 'contentlayer/source-files';

export const EmailFormControl = defineNestedType(() => ({
    name: 'EmailFormControl',
    fields: {
        name: { type: 'string' },
        label: { type: 'string' },
        hideLabel: { type: 'boolean' },
        placeholder: { type: 'string' },
        isRequired: { type: 'boolean' },
        width: { type: 'enum', options: ['full', '1/2'] }
    }
}));
