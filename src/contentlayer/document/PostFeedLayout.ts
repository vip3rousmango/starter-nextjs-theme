import { defineDocumentType } from 'contentlayer/source-files';
import { Person } from '..';
import { sectionComponent } from '../common';
import { ImageBlock } from '../nested/ImageBlock';
import { PagedPostsSection } from '../nested/PagedPostsSection';
import { Styles } from '../nested/Styles';

export const PostFeedLayout = defineDocumentType(() => ({
    name: 'PostFeedLayout',
    isSingleton: true,
    fields: {
        title: { type: 'string', default: 'This is a page title', required: true },
        numOfPostsPerPage: { type: 'number', default: 10, description: 'set to 0 to show all posts on a single page' },
        postFeed: {
            type: 'nested',
            of: PagedPostsSection,
            default: {
                title: null,
                subtitle: null,
                showDate: true,
                showAuthor: true,
                variant: 'variant-a',
                colors: 'colors-a',
                actions: []
            }
        },
        topSections: {
            type: 'list',
            of: sectionComponent
        },
        bottomSections: {
            type: 'list',
            of: sectionComponent
        },
        styles: {
            type: 'nested',
            of: Styles,
            default: {
                title: {
                    textAlign: 'center'
                }
            }
        }
    }
}));
