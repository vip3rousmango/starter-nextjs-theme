import { FC } from 'react';
import { PostFeedSection } from './PostFeedSection';
import type * as types from '.contentlayer/types';

export type Props = ReturnType<typeof resolveProps>;

export const PagedPostsSection: FC<Props> = (props) => {
  return <PostFeedSection {...props} annotatePosts={true} />;
};

export const resolveProps = (section: types.PagedPostsSection) => {
  const posts = [] as types.PostLayout[];

  return { ...section, posts };
};
