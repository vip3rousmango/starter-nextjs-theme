import { defineNestedType } from 'contentlayer/source-files';

export const MetaTag = defineNestedType(() => ({
    name: 'MetaTag',
    fields: {
        property: {
            type: 'enum',
            options: [
                'og:title',
                'og:type',
                'og:image',
                'og:image:alt',
                'og:url',
                'og:description',
                'og:locale',
                'og:site_name',
                'og:video',
                'twitter:card',
                'twitter:site',
                'twitter:creator',
                'twitter:description',
                'twitter:title',
                'twitter:image',
                'twitter:image:alt',
                'twitter:player'
            ]
        },
        content: {
            type: 'string'
        }
    }
}));
