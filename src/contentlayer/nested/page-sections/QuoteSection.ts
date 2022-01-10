import { defineNestedType } from 'contentlayer/source-files';
import { ImageBlock } from '../ImageBlock';
import { Styles } from '../Styles';
import { makeCommontSectionFields } from './common';

export const QuoteSection = defineNestedType(() => ({
  name: 'QuoteSection',
  fields: {
    ...makeCommontSectionFields(),
    quote: { type: 'markdown', required: true },
    name: { type: 'string' },
    title: { type: 'string' },
    backgroundImage: { type: 'nested', of: ImageBlock },
    styles: {
      type: 'nested',
      of: Styles,
      default: defaultStyles
    }
  }
}));

const defaultStyles = {
  self: {
    height: 'auto',
    width: 'wide',
    margin: ['mt-0', 'mb-0', 'ml-0', 'mr-0'],
    padding: ['pt-12', 'pb-12', 'pl-4', 'pr-4'],
    justifyContent: 'center',
    borderRadius: 'none',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'border-dark'
  },
  quote: {
    textAlign: 'center'
  },
  name: {
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'center'
  },
  title: {
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'center'
  }
};
