import { defineNestedType } from 'contentlayer/source-files';
import { Button } from '../Button';
import { Link } from '../Link';
import { Styles } from '../Styles';
import { makeCommontSectionFields } from './common';

export const FaqSection = defineNestedType(() => ({
  name: 'FaqSection',
  fields: {
    ...makeCommontSectionFields(),
    title: { type: 'string' },
    subtitle: { type: 'string' },
    actions: { type: 'list', of: [Button, Link], default: defaultActions },
    items: { type: 'list', of: FaqItem, default: defaultFaqItems },
    styles: {
      type: 'nested',
      of: Styles,
      default: defaultStyles
    }
  }
}));

const defaultFaqItems = [
  {
    question: 'How it this different from what we have today?',
    answer:
      'At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation.'
  },
  {
    question: 'How it this different from what we have today?',
    answer:
      'At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation.'
  },
  {
    question: 'How it this different from what we have today?',
    answer:
      'At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation. At the office, working together is often a distruction, on remote, it could be motivation.'
  }
];

const defaultActions = [
  {
    type: 'Link',
    label: 'See all',
    url: '/',
    showIcon: true,
    icon: 'arrowRight'
  }
];

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
  title: {
    textAlign: 'center'
  },
  subtitle: {
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'center'
  },
  actions: {
    justifyContent: 'center'
  }
};

const FaqItem = defineNestedType(() => ({
  name: 'FaqItem',
  fields: {
    question: { type: 'string', default: 'How it this different from what we have today?' },
    answer: {
      type: 'markdown',
      default: 'At the office, working together is often a distruction, on remote, it could be motivation.',
      required: true
    },
    styles: { type: 'nested', of: Styles, default: {} }
  }
}));
