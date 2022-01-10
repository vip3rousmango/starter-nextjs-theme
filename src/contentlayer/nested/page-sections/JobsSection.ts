import { defineNestedType } from 'contentlayer/source-files';
import { Styles } from '../Styles';

export const JobsSection = defineNestedType(() => ({
  name: 'JobsSection',
  fields: {
    styles: {
      type: 'nested',
      of: Styles,
      default: {}
    }
  }
}));
