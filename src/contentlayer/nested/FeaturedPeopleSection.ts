import { defineNestedType } from 'contentlayer/source-files';
import { Styles } from './Styles';

export const FeaturedPeopleSection = defineNestedType(() => ({
  name: 'FeaturedPeopleSection',
  fields: {
    styles: {
      type: 'nested',
      of: Styles,
      default: {}
    }
  }
}));
