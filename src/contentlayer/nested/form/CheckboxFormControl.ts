import { defineNestedType } from 'contentlayer/source-files';

export const CheckboxFormControl = defineNestedType(() => ({
  name: 'CheckboxFormControl',
  fields: {
    name: { type: 'string' },
    width: { type: 'string' }
  }
}));
