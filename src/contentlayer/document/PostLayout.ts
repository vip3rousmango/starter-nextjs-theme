import { defineDocumentType } from 'contentlayer/source-files';
import { Person } from '..';
import { sectionComponent } from '../common';
import { ImageBlock } from '../nested/ImageBlock';

export const PostLayout = defineDocumentType(() => ({
    name: 'PostLayout',
    fields: {
        title: { type: 'string', default: 'This is a blog post title', required: true },
        date: { type: 'date', required: true },
        author: { type: 'reference', of: Person, embedDocument: true },
        // TOOD
        category: { type: 'json' },
        excerpt: {
            type: 'string',
            default:
                'Nunc rutrum felis dui, ut consequat sapien scelerisque vel. Integer condimentum dignissim justo vel faucibus.'
        },
        featuredImage: {
            type: 'nested',
            of: ImageBlock,
            default: {
                type: 'ImageBlock',
                url: 'https://assets.stackbit.com/components/images/default/default-person.png',
                altText: 'Person photo',
                caption: ''
            }
        },
        bottomSections: {
            type: 'list',
            of: sectionComponent
        }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (_) => _._raw.flattenedPath.replace(/^pages\/blog\//, '')
        }
    }
}));