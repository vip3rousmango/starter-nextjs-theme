import { BLOG_URL, filterPostLayouts, getPagedPathsForPagePath, urlPathForDocument } from './static-resolver-utils';
import type * as types from 'types';

export function resolveStaticPaths(documents: types.DocumentTypes[]) {
    const allPosts = filterPostLayouts(documents);

    return documents.reduce((paths: string[], doc) => {
        switch (doc.type) {
            case 'PageLayout':
                return paths.concat(urlPathForDocument(doc));
            case 'PostLayout':
                return paths.concat(urlPathForDocument(doc));
            case 'PostFeedLayout':
                const paginationPaths = getPagedPathsForPagePath(`/${BLOG_URL}`, allPosts, doc.numOfPostsPerPage ?? 10);
                return paths.concat(paginationPaths);
            case 'Person':
                if (!doc.slug) {
                    return paths;
                }
                const authorPosts = allPosts.filter((post) => post.author === doc.__metadata.id);
                const authorPaths = getPagedPathsForPagePath(`${BLOG_URL}/author/${doc.slug}`, authorPosts, 0);
                return paths.concat(authorPaths);
            case 'BlogCategory':
                if (!doc.slug) {
                    return paths;
                }
                const categoryPosts = allPosts.filter((post) => post.category === doc.__metadata.id);
                const categoryPaths = getPagedPathsForPagePath(`${BLOG_URL}/category/${doc.slug}`, categoryPosts, 0);
                return paths.concat(categoryPaths);
            default:
                // do not create page paths for other documents
                return paths;
        }
    }, []);
}
