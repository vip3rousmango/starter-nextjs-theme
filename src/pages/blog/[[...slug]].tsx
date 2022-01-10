import { FC } from 'react';
import { config, postFeedLayout, allPostLayouts, allPeople } from '.contentlayer/data';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as PostLayout from '../../components/layouts/PostLayout';
import type * as types from '.contentlayer/types';
import * as PostFeedLayout from '../../components/layouts/PostFeedLayout';

type Props = { type: 'post'; data: PostLayout.Props } | { type: 'feed'; data: PostFeedLayout.Props };

const Page: FC<Props> = (props) => {
  if (props.type === 'feed') {
    return <PostFeedLayout.PostFeedLayout {...props.data} />;
  } else {
    return <PostLayout.PostLayout {...props.data} />;
  }
};

export default Page;

const POSTS_PER_PAGE = 10;
const baseUrlPath = '/blog';

export const getStaticPaths: GetStaticPaths = () => {
  const numOfPages = Math.ceil(allPostLayouts.length / POSTS_PER_PAGE);
  const paginationPaths = Array.from(new Array(numOfPages), (_, i) => `/blog/page/${i + 1}`);
  // TODO author pagination
  const authorPaths = allPeople.map((author) => `/blog/author/${author.slug}`);

  const paths = ['/blog', ...paginationPaths, ...allPostLayouts.map(({ slug }) => `/blog/${slug}`), ...authorPaths];

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
  const slug = params?.slug?.join('/') ?? '';
  const isFeed = slug === '' || slug.match(/page\/\d+$/) !== null || slug.match(/author\//) !== null;

  if (isFeed) {
    const { filterByAuthorSlug, pageIndex } = pageInfoFromSlug(slug);
    const filteredPosts =
      filterByAuthorSlug === null
        ? allPostLayouts
        : allPostLayouts.filter(({ author }) => author?.slug === filterByAuthorSlug);
    const numOfPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const posts = filteredPosts
      .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
      .sort(sortPostsByDateDesc);

    const data: PostFeedLayout.Props = {
      site: config,
      page: { ...postFeedLayout, numOfPages, baseUrlPath, pageIndex },
      posts
    };

    return { props: { type: 'feed', data } };
  } else {
    const post = allPostLayouts.find((post) => post.slug === slug)!;
    // TODO make dynamic using `recentCount
    const recentPosts = allPostLayouts.sort(sortPostsByDateDesc).slice(0, 3);
    const data: PostLayout.Props = { site: config, page: post, recentPosts };

    return { props: { type: 'post', data } };
  }
};

const sortPostsByDateDesc = (postA: types.PostLayout, postB: types.PostLayout) =>
  new Date(postB.date).getTime() - new Date(postA.date).getTime();

const pageInfoFromSlug = (slug: string) => {
  // https://regex101.com/r/bzQKL1/1
  const regex = /(author\/(?<authorName>[a-zA-Z-_]+)\/?)?(page\/(?<pageIndex>\d+))?/;
  const match = slug.match(regex);

  const pageIndex = match?.groups?.pageIndex ? parseInt(match.groups.pageIndex) - 1 : 0;
  const filterByAuthorSlug = match?.groups?.authorName ?? null;

  return { pageIndex, filterByAuthorSlug };
};
