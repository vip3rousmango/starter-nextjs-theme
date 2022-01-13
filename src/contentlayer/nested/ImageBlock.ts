import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';
import { Styles } from './Styles';

export const ImageBlock = defineNestedType(() => ({
    name: 'ImageBlock',
    fields: {
        url: {
            type: 'string',
            description: 'The URL of the image',
            default: 'https://assets.stackbit.com/components/images/default/default-image.png'
        },
        altText: {
            type: 'string',
            description: 'The alternative text for screen readers',
            default: ''
        },
        caption: {
            type: 'string',
            description: 'The caption of the timage',
            default: ''
        },
        styles: {
            type: 'nested',
            of: Styles,
            default: {
                self: {
                    opacity: 100
                }
            }
        },
        elementId
    }
}));
