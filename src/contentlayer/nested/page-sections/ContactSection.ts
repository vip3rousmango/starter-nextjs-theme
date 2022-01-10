import { defineNestedType } from 'contentlayer/source-files';
import { FormBlock } from '../form/FormBlock';
import { ImageBlock } from '../ImageBlock';
import { Styles } from '../Styles';
import { VideoBlock } from '../VideoBlock';
import { makeCommontSectionFields } from './common';

export const ContactSection = defineNestedType(() => ({
  name: 'ContactSection',
  fields: {
    ...makeCommontSectionFields(),
    backgroundSize: { type: 'enum', options: ['full', 'inset'], default: 'full' },
    title: { type: 'string' },
    text: { type: 'markdown' },
    form: { type: 'nested', of: FormBlock, default: defaultForm },
    media: {
      type: 'nested',
      of: [ImageBlock, VideoBlock]
      // default: defaultMedia
    },
    styles: {
      type: 'nested',
      of: Styles,
      default: defaultStyles
    }
  }
}));

const defaultForm = {
  type: 'FormBlock',
  elementId: 'contact-form',
  action: '/.netlify/functions/submission_created',
  destination: '',
  fields: [
    {
      type: 'TextFormControl',
      name: 'name',
      label: 'Name',
      placeholder: 'Your name',
      isRequired: true,
      width: '1/2'
    },
    {
      type: 'EmailFormControl',
      name: 'email',
      label: 'Email',
      placeholder: 'Your email',
      isRequired: true,
      width: '1/2'
    },
    {
      type: 'TextFormControl',
      name: 'home-address',
      label: 'Home address',
      placeholder: 'Your home address',
      isRequired: true,
      width: 'full'
    },
    {
      type: 'CheckboxFormControl',
      name: 'updates',
      label: 'Sign me up to receive updates',
      width: 'full'
    }
  ],
  submitLabel: 'Send Message'
};

// const defaultMedia = {
//   type: 'ImageBlock',
//   url: 'https://assets.stackbit.com/components/images/default/contact.png',
//   altText: 'Contact form image'
// };

const defaultStyles = {
  self: {
    height: 'auto',
    width: 'wide',
    margin: ['mt-0', 'mb-0', 'ml-0', 'mr-0'],
    padding: ['pt-12', 'pb-12', 'pl-4', 'pr-4'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 'none',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'border-dark'
  },
  title: {
    textAlign: 'left'
  },
  text: {
    textAlign: 'left'
  }
};
