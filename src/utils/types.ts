import type * as types from '.contentlayer/types';

export type StackbitFieldPath = { 'data-sb-field-path': string };

export const sortPostsByDateDesc = (postA: types.PostLayout, postB: types.PostLayout) =>
  new Date(postB.date).getTime() - new Date(postA.date).getTime();
