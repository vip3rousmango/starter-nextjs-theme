import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const Social = defineNestedType(() => ({
    name: 'Social',
    fields: {
        label: {
            type: 'string',
            default: 'Facebook'
        },
        altText: { type: 'string', default: '' },
        url: { type: 'string', default: '/', required: true },
        icon: {
            type: 'enum',
            options: ['facebook', 'github', 'instagram', 'linkedin', 'reddit', 'twitter', 'vimeo', 'youtube'],
            default: 'facebook'
        },
        style: {
            type: 'enum',
            options: ['link', 'primary', 'secondary'],
            default: 'link'
        },
        elementId
    }
}));
