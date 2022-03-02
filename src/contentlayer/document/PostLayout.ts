import { defineDocumentType } from 'contentlayer/source-files';
import { BlogCategory, Person } from '..';
import { sectionComponent } from '../common';
import { ImageBlock } from '../nested/ImageBlock';
import { makeCommonSEOFields } from './common';

export const PostLayout = defineDocumentType(() => ({
    name: 'PostLayout',
    bodyType: 'markdown',
    fields: {
        title: { type: 'string', default: 'This is a blog post title', required: true },
        date: { type: 'date', required: true },
        author: { type: 'reference', of: Person, embedDocument: false },
        category: { type: 'reference', of: BlogCategory, embedDocument: false },
        excerpt: {
            type: 'string',
            default: 'Nunc rutrum felis dui, ut consequat sapien scelerisque vel. Integer condimentum dignissim justo vel faucibus.'
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
        },
        ...makeCommonSEOFields()
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (_) => _._raw.flattenedPath.replace(/^pages\/blog(\/|$)/, '')
        }
    }
}));
