import * as types from '.contentlayer/types';

export const sortPostsByDateDesc = (postA: types.PostLayout, postB: types.PostLayout) => new Date(postB.date).getTime() - new Date(postA.date).getTime();

export function resolveBlogPostLayout(postLayout: types.PostLayout, allDocuments: types.DocumentTypes[]) {
    const allPersons = allDocuments.filter(types.isType('Person'));
    const allCategories = allDocuments.filter(types.isType('BlogCategory'));
    const { author: authorId, category: categoryId, ...rest } = postLayout;
    const author = allPersons.find((doc) => doc.__metadata.id === authorId);
    const category = allCategories.find((doc) => doc.__metadata.id === categoryId);
    return {
        ...rest,
        ...(author && { author }),
        ...(category && { category })
    };
}
