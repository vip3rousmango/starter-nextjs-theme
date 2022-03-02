import { defineNestedType } from 'contentlayer/source-files';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ImageBlock } from '../ImageBlock';
import { Link } from '../Link';
import { VideoBlock } from '../VideoBlock';
import { makeCommontSectionFields } from './common';

export const FeatureHighlightSection = defineNestedType(() => ({
    name: 'FeatureHighlightSection',
    fields: {
        ...makeCommontSectionFields(),
        // TODO change default color
        backgroundSize: { type: 'enum', options: ['full', 'inset'], default: 'full' },
        title: { type: 'string', default: 'This Is A Feature Title' },
        subtitle: { type: 'string', default: 'Subtitle' },
        badge: { type: 'nested', of: Badge },
        text: { type: 'markdown', default: defaultText },
        actions: { type: 'list', of: [Button, Link], default: defaultActions },
        media: { type: 'nested', of: [ImageBlock, VideoBlock], default: defaultMediaBlock },
        styles: {
            type: 'json',
            default: defaultStyles
        }
    }
}));

const defaultText = `\
Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.
Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet
erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat
vitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.
`;

const defaultActions = [
    {
        type: 'Button',
        label: 'Get Started',
        url: '/',
        style: 'primary',
        elementId: 'hero-main-button'
    },
    {
        type: 'Button',
        label: 'Learn More',
        url: '/',
        style: 'secondary'
    }
];

const defaultMediaBlock = {
    type: 'ImageBlock',
    url: 'https://assets.stackbit.com/components/images/default/hero.png',
    altText: 'Hero section image'
};

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
        borderColor: 'border-dark',
        boxShadow: 'none'
    },
    title: {
        textAlign: 'left'
    },
    subtitle: {
        fontWeight: 400,
        fontStyle: 'normal',
        textAlign: 'left'
    },
    text: {
        textAlign: 'left'
    },
    actions: {
        justifyContent: 'flex-start'
    }
};
