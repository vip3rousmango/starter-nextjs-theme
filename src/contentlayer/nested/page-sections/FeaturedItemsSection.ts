import { defineNestedType } from 'contentlayer/source-files';
import { colors, elementId } from '../../common';
import { Button } from '../Button';
import { ImageBlock } from '../ImageBlock';
import { Link } from '../Link';

export const FeaturedItemsSection = defineNestedType(() => ({
    name: 'FeaturedItemsSection',
    fields: {
        title: { type: 'string', default: 'Featured Items' },
        subtitle: { type: 'string', default: 'The section subtitle' },
        items: { type: 'list', of: FeaturedItem, default: defaultFeaturedItems },
        actions: { type: 'list', of: [Button, Link], default: defaultActions },
        columns: { type: 'number', default: 4 },
        enableHover: { type: 'boolean', default: true },
        colors,
        elementId,
        styles: {
            type: 'json',
            default: defaultStyles
        }
    }
}));

export const FeaturedItem = defineNestedType(() => ({
    name: 'FeaturedItem',
    fields: {
        elementId,
        title: { type: 'string', default: 'Item Title' },
        subtitle: { type: 'string', default: '' },
        text: {
            type: 'markdown',
            default:
                'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.'
        },
        featuredImage: { type: 'nested', of: ImageBlock, default: defaultFeaturedImage },
        actions: { type: 'list', of: [Button, Link] },
        enableHover: { type: 'boolean', default: true },
        styles: {
            type: 'json',
            default: {
                self: { textAlign: 'left' }
            }
        }
    }
}));

const defaultFeaturedImage = {
    type: 'ImageBlock',
    url: 'https://assets.stackbit.com/components/images/default/default-image.png',
    altText: 'Item image'
};

const defaultFeaturedItems = [
    {
        type: 'FeaturedItem',
        title: 'Item Title',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.',
        featuredImage: {
            type: 'ImageBlock',
            url: 'https://assets.stackbit.com/components/images/default/default-image.png',
            altText: 'Item image'
        },
        styles: {
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
        }
    }
];

const defaultActions = [
    {
        type: 'Button',
        label: 'Apply Now',
        url: '#',
        style: 'primary'
    },
    {
        type: 'Button',
        label: 'Learn More',
        url: '#',
        style: 'secondary'
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
