import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const Link = defineNestedType(() => ({
    name: 'Link',
    fields: {
        label: { type: 'string', default: 'Learn more' },
        altText: {
            type: 'string',
            description: 'The alternative text for screen readers',
            default: ''
        },
        url: {
            type: 'string',
            default: '/',
            required: true
        },
        showIcon: {
            type: 'boolean',
            default: false
        },
        icon: {
            type: 'enum',
            options: [
                'apple',
                'arrowLeft',
                'arrowLeftCircle',
                'arrowRight',
                'arrowRightCircle',
                'cart',
                'chevronLeft',
                'chevronRight',
                'facebook',
                'github',
                'googlePlay',
                'instagram',
                'linkedin',
                'mail',
                'play',
                'playCircle',
                'reddit',
                'send',
                'twitter',
                'vimeo',
                'youtube'
            ],
            default: 'arrowRight'
        },
        iconPosition: {
            type: 'enum',
            options: ['left', 'right'],
            default: 'right'
        },
        elementId
    }
}));
