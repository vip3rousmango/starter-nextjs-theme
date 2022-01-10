import { PostFeedSection } from './PostFeedSection';
import * as types from '.contentlayer/types';
export default PostFeedSection;

export type RecentPostsSection_Output = ReturnType<typeof mapData>;

export const mapData = (section: types.RecentPostsSection, allDocuments: types.DocumentTypes[]) => {
  const posts = allDocuments.filter(types.isType('PostLayout'));

  return { ...section, posts };
};
