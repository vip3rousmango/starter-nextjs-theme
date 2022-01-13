import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../../common';
import { Styles } from '../Styles';
import { CheckboxFormControl } from './CheckboxFormControl';
import { EmailFormControl } from './EmailFormControl';
import { SelectFormControl } from './SelectFormControl';
import { TextareaFormControl } from './TextareaFormControl';
import { TextFormControl } from './TextFormControl';

export const FormBlock = defineNestedType(() => ({
  name: 'FormBlock',
  fields: {
    variant: { type: 'enum', options: ['variant-a', 'variant-b'], default: 'variant-a' },
    fields: {
      type: 'list',
      of: [TextFormControl, EmailFormControl, CheckboxFormControl, SelectFormControl, TextareaFormControl]
    },
    submitLabel: { type: 'string' },
    elementId,
    action: { type: 'string' },
    destination: { type: 'string' },
    styles: {
      type: 'nested',
      of: Styles
    }
  }
}));
