import { defineNestedType } from 'contentlayer/source-files';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { FormBlock } from '../form/FormBlock';
import { ImageBlock } from '../ImageBlock';
import { Link } from '../Link';
import { VideoBlock } from '../VideoBlock';
import { makeCommontSectionFields } from './common';

export const HeroSection = defineNestedType(() => ({
    name: 'HeroSection',
    fields: {
        ...makeCommontSectionFields(),
        // TODO change default color
        title: { type: 'string', default: 'This Is A Big Hero Headline' },
        subtitle: { type: 'string', default: 'The section subtitle' },
        badge: { type: 'nested', of: Badge },
        text: { type: 'markdown', default: defaultText },
        actions: { type: 'list', of: [Button, Link], default: defaultActions },
        media: { type: 'nested', of: [FormBlock, ImageBlock, VideoBlock], default: defaultMediaBlock },
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
        borderColor: 'border-dark'
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
