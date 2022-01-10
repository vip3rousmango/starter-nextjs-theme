import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../../common';
import { ImageBlock } from '../ImageBlock';
import { Styles } from '../Styles';
import { makeCommontSectionFields } from './common';

export const TestimonialsSection = defineNestedType(() => ({
  name: 'TestimonialsSection',
  fields: {
    ...makeCommontSectionFields(),
    variant: { type: 'enum', options: ['variant-a', 'variant-b', 'variant-c'], default: 'variant-a' },
    title: { type: 'string' },
    subtitle: { type: 'string' },
    testimonials: { type: 'list', of: Testimonial, default: defaultTestimonials },
    styles: {
      type: 'nested',
      of: Styles,
      default: {}
    }
  }
}));

const Testimonial = defineNestedType(() => ({
  name: 'Testimonial',
  fields: {
    quote: { type: 'markdown', required: true },
    name: { type: 'string' },
    title: { type: 'string' },
    image: { type: 'nested', of: ImageBlock },
    elementId,
    styles: {
      type: 'nested',
      of: Styles
    }
  }
}));

const defaultTestimonials = [
  {
    type: 'Testimonial',
    quote:
      '“It’s great to see someone taking action while still maintaining a\nsustainable fish supply to home cooks.”',
    name: 'Johnna Doe',
    title: 'Product Marketing Manager at Acme',
    image: {
      type: 'ImageBlock',
      url: 'https://assets.stackbit.com/components/images/default/default-person.png',
      altText: 'Person photo'
    }
  }
];
