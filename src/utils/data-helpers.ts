import type * as types from '.contentlayer/types';

export const sortPostsByDateDesc = (postA: types.PostLayout, postB: types.PostLayout) =>
    new Date(postB.date).getTime() - new Date(postA.date).getTime();
