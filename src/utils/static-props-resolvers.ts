import { PageProps } from '../components/layouts';
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
    urlPathForDocument,
    pageProps,
    splitUrl,
    BLOG_URL
} from './static-resolver-utils';
import { DocumentTypes } from 'types';

export async function resolveStaticProps(urlPath: string, documents: DocumentTypes[]): Promise<PageProps> {
    // remove the leading and trailing slash
    const urlParts = splitUrl(urlPath);

    if (urlParts[0] === BLOG_URL) {
        // any page url that starts with "/blog"

        if (urlParts.length === 2) {
            // any page url including only two parts is a single blog post: "/blog/blog-post"
            const post = filterPostLayouts(documents).find((post) => urlPathForDocument(post) === urlPath)!;
            const postLayoutProps = await resolvePropsForPostLayout(post, documents);
            return pageProps(postLayoutProps, urlPath, documents);
        } else if (urlParts[1] === 'author') {
            // any page url having "author" as a second part is author's post feed: "/blog/author/john-doe[/page/{N}]"
            const { __metadata, ...author } = findPersonBySlug(documents, urlParts[2])!;
            const authorPosts = getAuthorPostsSorted(documents, __metadata.id);
            const paginationData = getPaginationDataForPagePath(urlPath, authorPosts, 0);
            const postFeedLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata,
                    type: 'PostFeedLayout',
                    title: `Posts by ${author.firstName} ${author.lastName}`,
                    postFeed: {
                        type: 'PagedPostsSection',
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                documents
            );
            return pageProps(postFeedLayoutProps, urlPath, documents);
        } else if (urlParts[1] === 'category') {
            // any page url having "category" as a second part is category's post feed: "/blog/author/john-doe[/page/{N}]"
            const { __metadata, ...category } = findCategoryBySlug(documents, urlParts[2])!;
            const categoryPosts = getSortedCategoryPosts(documents, __metadata.id);
            const paginationData = getPaginationDataForPagePath(urlPath, categoryPosts, 0);
            const postFeedLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata,
                    type: 'PostFeedLayout',
                    title: `Posts in ${category.title} category`,
                    postFeed: {
                        type: 'PagedPostsSection',
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                documents
            );
            return pageProps(postFeedLayoutProps, urlPath, documents);
        } else {
            // any other page is post feed or one of its pagination pages: "/blog[/page/{N}]"
            const { __metadata, ...postFeedLayout } = findPostFeedLayout(documents)!;
            const allPostsSorted = getAllSortedPosts(documents);
            const paginationData = getPaginationDataForPagePath(urlPath, allPostsSorted, postFeedLayout.numOfPostsPerPage ?? 10);
            const postFeedLayoutProps = await resolvePropsForPostFeedLayout(
                {
                    __metadata,
                    ...postFeedLayout,
                    ...paginationData
                },
                documents
            );
            return pageProps(postFeedLayoutProps, urlPath, documents);
        }
    }

    // all other pages
    const doc = filterPageLayouts(documents).find((doc) => urlPathForDocument(doc) === urlPath)!;
    const pageLayoutProps = await resolvePropsForPageLayout(doc, documents);
    return pageProps(pageLayoutProps, urlPath, documents);
}
