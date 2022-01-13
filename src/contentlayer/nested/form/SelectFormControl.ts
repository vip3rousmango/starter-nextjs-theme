import { defineNestedType } from 'contentlayer/source-files';

export const SelectFormControl = defineNestedType(() => ({
  name: 'SelectFormControl',
  fields: {
    name: { type: 'string' },
    label: { type: 'string' },
    hideLabel: { type: 'boolean' },
    defaultValue: { type: 'string' },
    options: { type: 'list', of: { type: 'string' } },
    isRequired: { type: 'boolean' },
    width: { type: 'enum', options: ['full', '1/2'] }
  }
}));
