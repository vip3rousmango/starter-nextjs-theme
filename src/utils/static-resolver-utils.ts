import * as types from 'types';

export function getAllSortedPosts(documents: types.DocumentTypes[]) {
    return filterPostLayouts(documents).sort(sortPostsByDateDesc);
}

export function getSortedCategoryPosts(documents: types.DocumentTypes[], categoryId: string) {
    return filterPostLayouts(documents)
        .filter((post) => post.category === categoryId)
        .sort(sortPostsByDateDesc);
}

export function getAuthorPostsSorted(documents: types.DocumentTypes[], authorId: string) {
    return filterPostLayouts(documents)
        .filter((post) => post.author === authorId)
        .sort(sortPostsByDateDesc);
}

export function sortPostsByDateDesc(postA: types.PostLayout, postB: types.PostLayout) {
    return new Date(postB.date).getTime() - new Date(postA.date).getTime();
}

export function findPersonBySlug(documents: types.DocumentTypes[], slug: string) {
    return documents.filter(isPerson).find((person) => person.slug === slug);
}

export function findCategoryBySlug(documents: types.DocumentTypes[], slug: string) {
    return documents.filter(isBlogCategory).find((category) => category.slug === slug);
}

export function filterPageLayouts(documents: types.DocumentTypes[]) {
    return documents.filter(isPageLayout);
}

export function filterPostLayouts(documents: types.DocumentTypes[]) {
    return documents.filter(isPostLayout);
}

export function filterPersons(documents: types.DocumentTypes[]) {
    return documents.filter(isPerson);
}

export function findPostFeedLayout(documents: types.DocumentTypes[]) {
    return documents.find(isPostFeedLayout);
}

export function findConfig(documents: types.DocumentTypes[]) {
    return documents.find(isConfig);
}

export function isPageLayout(document: types.DocumentTypes): document is types.PageLayout {
    return document.type === 'PageLayout';
}

export function isPostLayout(document: types.DocumentTypes): document is types.PostLayout {
    return document.type === 'PostLayout';
}

export function isPerson(document: types.DocumentTypes): document is types.Person {
    return document.type === 'Person';
}

export function isBlogCategory(document: types.DocumentTypes): document is types.BlogCategory {
    return document.type === 'BlogCategory';
}

export function isPostFeedLayout(document: types.DocumentTypes): document is types.PostFeedLayout {
    return document.type === 'PostFeedLayout';
}

export function isConfig(document: types.DocumentTypes): document is types.Config {
    return document.type === 'Config';
}

export function resolveBlogPostLayout(postLayout: types.PostLayout, allDocuments: types.DocumentTypes[]): types.PostLayoutResolved {
    const allPersons = allDocuments.filter(isPerson);
    const allCategories = allDocuments.filter(isBlogCategory);
    const { author: authorId, category: categoryId, ...rest } = postLayout;
    const author = allPersons.find((doc) => doc.__metadata.id === authorId);
    const category = allCategories.find((doc) => doc.__metadata.id === categoryId);
    return {
        ...rest,
        ...(author && { author }),
        ...(category && { category })
    };
}

export function getPagedPathsForPagePath(pageUrlPath: string, items: any[], numOfItemsPerPage: number) {
    if (numOfItemsPerPage === 0) {
        return [pageUrlPath];
    }
    const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
    const paths = [];
    for (let i = 0; i < numOfPages; i++) {
        paths.push(i === 0 ? pageUrlPath : `${pageUrlPath}/page/${i + 1}`);
    }
    return paths;
}

export function getPaginationDataForPagePath<T>(pageUrlPath: string, items: T[], numOfItemsPerPage: number): types.Pagination<T> {
    const baseUrlPath = getRootPagePath(pageUrlPath);
    if (numOfItemsPerPage === 0) {
        return {
            pageIndex: 0,
            baseUrlPath,
            numOfPages: 1,
            numOfTotalItems: items.length,
            items: items
        };
    }
    const pageIndexMatch = pageUrlPath.match(/\/page\/(\d+)$/);
    const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1]) - 1 : 0;
    const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
    const startIndex = pageIndex * numOfItemsPerPage;
    const endIndex = startIndex + numOfItemsPerPage;
    return {
        pageIndex,
        baseUrlPath,
        numOfPages: numOfPages,
        numOfTotalItems: items.length,
        items: items.slice(startIndex, endIndex)
    };
}

export function getRootPagePath(pagePath: string) {
    const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
    if (!pagedPathMatch) {
        return pagePath;
    }
    return pagePath.substring(0, pagedPathMatch.index);
}
