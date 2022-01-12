import { defineNestedType } from 'contentlayer/source-files';
import { Person } from '..';
import { Button } from './Button';
import { Link } from './Link';
import { makeCommontSectionFields } from './page-sections/common';
import { Styles } from './Styles';

export const FeaturedPeopleSection = defineNestedType(() => ({
  name: 'FeaturedPeopleSection',
  fields: {
    ...makeCommontSectionFields(),
    variant: { type: 'enum', options: ['variant-a', 'variant-b', 'variant-c'] },
    title: { type: 'string' },
    subtitle: { type: 'string' },
    actions: { type: 'list', of: [Button, Link] },
    people: { type: 'list', of: Person },
    styles: {
      type: 'nested',
      of: Styles,
      default: {}
    }
  }
}));
