import { defineDocumentType } from 'contentlayer/source-files';
import { ImageBlock } from '../nested/ImageBlock';

export const Person = defineDocumentType(() => ({
    name: 'Person',
    fields: {
        firstName: { type: 'string', default: 'Name', required: true },
        lastName: { type: 'string', default: 'Last Name', required: true },
        role: { type: 'string', default: 'Role' },
        bio: {
            type: 'markdown',
            default:
                'With over 10 years in both public and private sectors, Johnna has experience in management consultation, team building, professional development, strategic implementation, and company collaboration.'
        },
        image: {
            type: 'nested',
            of: ImageBlock,
            default: {
                type: 'ImageBlock',
                url: 'https://assets.stackbit.com/components/images/default/default-person.png',
                altText: 'Person photo'
            }
        }
    },
    computedFields: {
        slug: { type: 'string', resolve: (_) => _._raw.sourceFileName.replace(/\.json$/, '') }
    }
}));
