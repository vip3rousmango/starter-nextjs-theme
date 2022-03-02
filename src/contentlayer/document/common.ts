import { MetaTag } from '../nested/MetaTag';
import { PagedPostsSection } from '../nested/PagedPostsSection';
import { sectionComponent } from '../common';

export const makeCommonSEOFields = () =>
    ({
        metaTitle: { type: 'string' },
        metaDescription: { type: 'string' },
        addTitleSuffix: { type: 'boolean' },
        socialImage: { type: 'string' },
        metaTags: {
            type: 'list',
            of: [MetaTag]
        }
    } as const);

export const makePostFeedLayoutFields = () =>
    ({
        title: { type: 'string', required: true },
        numOfPostsPerPage: { type: 'number' },
        postFeed: {
            type: 'nested',
            of: PagedPostsSection
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
            type: 'json',
            default: {
                title: {
                    textAlign: 'center'
                }
            }
        },
        ...makeCommonSEOFields()
    } as const);
