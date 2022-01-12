import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';
import { Styles } from './Styles';

export const Badge = defineNestedType(() => ({
  name: 'Badge',
  fields: {
    label: { type: 'string' },
    elementId,
    styles: {
      type: 'nested',
      of: Styles
    }
  }
}));
