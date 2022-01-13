import { defineNestedType } from 'contentlayer/source-files';
import { Button } from '../Button';
import { ImageBlock } from '../ImageBlock';
import { Link } from '../Link';
import { Styles } from '../Styles';
import { makeCommontSectionFields } from './common';

export const CtaSection = defineNestedType(() => ({
    name: 'CtaSection',
    fields: {
        ...makeCommontSectionFields(),
        backgroundSize: { type: 'enum', options: ['full', 'inset'], default: 'full' },
        title: { type: 'string' },
        text: { type: 'markdown' },
        actions: { type: 'list', of: [Button, Link], default: defaultActions },
        backgroundImage: { type: 'nested', of: ImageBlock },
        styles: {
            type: 'nested',
            of: Styles,
            default: {}
        }
    }
}));

const defaultActions = [
    {
        type: 'Button',
        label: 'Try it now',
        url: '/about',
        style: 'primary'
    }
];
