import { AllPageLayoutProps, PageProps } from '../components/layouts';
import { resolveProps as resolvePropsForPageLayout } from '../components/layouts/PageLayout';
import { resolveProps as resolvePropsForPostLayout } from '../components/layouts/PostLayout';
import { resolveProps as resolvePropsForPostFeedLayout } from '../components/layouts/PostFeedLayout';
import {
    getSortedCategoryPosts,
    getPaginationDataForPagePath,
    getAuthorPostsSorted,
    getAllSortedPosts,
    findPersonBySlug,
    findCategoryBySlug,
    filterPostLayouts,
    findPostFeedLayout,
    filterPageLayouts,
    findConfig
} from './static-resolver-utils';
import { ConfigWithEnv, DocumentTypes } from 'types';

export async function resolveStaticProps(urlPath: string, documents: DocumentTypes[]): Promise<PageProps> {
    // remove the leading and trailing slash
    const cleanUrlPath = urlPath.replace(/^\/|\/$/g, '');
    const urlParts = cleanUrlPath.split('/');
    let pageLayoutProps: AllPageLayoutProps;

    if (urlParts[0] === 'blog') {
        // any page url that starts with "/blog"
        if (urlParts.length === 2) {
            // any page url consisting of two parts is a single post: "/blog/blog-post"
            const post = filterPostLayouts(documents).find((post) => post.__metadata.urlPath === urlPath)!;
            pageLayoutProps = await resolvePropsForPostLayout(post, documents);
        } else if (urlParts[1] === 'author') {
            // any page url having "author" as a second part is author's post feed: "/blog/author/john-doe[/page/{N}]"
            const { __metadata, ...author } = findPersonBySlug(documents, urlParts[2])!;
            const authorPosts = getAuthorPostsSorted(documents, __metadata.id);
            const paginationData = getPaginationDataForPagePath(urlPath, authorPosts, 0);
            pageLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata: {
                        ...__metadata,
                        urlPath
                    },
                    type: 'PostFeedLayout',
                    title: `Posts by ${author.firstName} ${author.lastName}`,
                    postFeed: {
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                documents
            );
        } else if (urlParts[1] === 'category') {
            // any page url having "category" as a second part is category's post feed: "/blog/author/john-doe[/page/{N}]"
            const { __metadata, ...category } = findCategoryBySlug(documents, urlParts[2])!;
            const categoryPosts = getSortedCategoryPosts(documents, __metadata.id);
            const paginationData = getPaginationDataForPagePath(urlPath, categoryPosts, 0);
            pageLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata: {
                        ...__metadata,
                        urlPath
                    },
                    type: 'PostFeedLayout',
                    title: `Posts in ${category.title} category`,
                    postFeed: {
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                documents
            );
        } else {
            // any other page is post feed or one of its pagination pages: "/blog[/page/{N}]"
            const { __metadata, ...postFeedLayout } = findPostFeedLayout(documents)!;
            const allPostsSorted = getAllSortedPosts(documents);
            const paginationData = getPaginationDataForPagePath(urlPath, allPostsSorted, postFeedLayout.numOfPostsPerPage ?? 10);
            pageLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata: {
                        ...__metadata,
                        urlPath
                    },
                    ...postFeedLayout,
                    ...paginationData
                },
                documents
            );
        }
    } else {
        // all other pages
        const doc = filterPageLayouts(documents).find((doc) => doc.__metadata.urlPath === urlPath)!;
        pageLayoutProps = await resolvePropsForPageLayout(doc, documents);
    }

    const config = findConfig(documents)!;
    const configWithEnv: ConfigWithEnv = {
        ...config,
        env: {
            ...(process?.env?.URL && { URL: process.env.URL })
        }
    };

    return {
        site: {
            ...configWithEnv,
            baseLayout: null
        },
        page: {
            ...pageLayoutProps,
            baseLayout: null
        }
    };
}
