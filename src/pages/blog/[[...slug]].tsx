import { FC } from 'react';
// import { allPostLayouts, allPeople, allDocuments } from '.contentlayer/data';
import * as types from '.contentlayer/types';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { resolveProps as resolvePropsForPostLayout, Props as PostLayoutProps } from '../../components/layouts/PostLayout';
import { Props as PostFeedLayoutProps, resolveProps as resolvePropsForPostFeedLayout } from '../../components/layouts/PostFeedLayout';
import { DynamicComponent } from '../../components/DynamicComponent';
import { sortPostsByDateDesc } from '../../utils/data-helpers';

type Props = PostLayoutProps | PostFeedLayoutProps;

const Page: FC<Props> = (props) => <DynamicComponent {...props} />;

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();

    // blog post paths /blog/{post}
    const allPosts = data.pages.filter(types.isType('PostLayout'));
    const postPaths = allPosts.map((postLayout) => postLayout.__metadata.urlPath);

    // author post's feed paths /blog/author/{author} and /blog/author/{author}/page/{n}
    const allPersons = data.objects.filter(types.isType('Person'));
    const authorPaths: string[] = allPersons
        .filter((author) => author.slug)
        .reduce((paths: string[], author) => {
            const authorPosts = allPosts.filter((post) => post.author === author.__metadata.id);
            const authorPaths = getPagedPathsForPagePath(`/blog/author/${author.slug}`, authorPosts, 0);
            return paths.concat(authorPaths);
        }, []);

    // blog category feed paths /blog/category/{category} and /blog/category/{category}/page/{n}
    const allCategories = data.objects.filter(types.isType('BlogCategory'));
    const allCategoryPaths: string[] = allCategories
        .filter((category) => category.slug)
        .reduce((paths: string[], category) => {
            const categoryPosts = allPosts.filter((post) => post.category === category.__metadata.id);
            const categoryPaths = getPagedPathsForPagePath(`/blog/category/${category.slug}`, categoryPosts, 0);
            return paths.concat(categoryPaths);
        }, []);

    // all blog post feed paths /blog and /blog/page/{n}
    const postFeedLayout = data.pages.find(types.isType('PostFeedLayout'));
    let paginationPaths: string[] = [];
    if (postFeedLayout) {
        const numOfPostsPerPage = postFeedLayout.numOfPostsPerPage;
        paginationPaths = getPagedPathsForPagePath('/blog', allPosts, numOfPostsPerPage);
    }

    const paths = [...paginationPaths, ...postPaths, ...authorPaths, ...allCategoryPaths];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const slug = params?.slug?.join('/') ?? '';
    const { pageType, typeSlug } = pageTypeFromSlug(slug);
    const data = await sourcebitDataClient.getData();

    const allPosts = data.objects.filter(types.isType('PostLayout')).sort(sortPostsByDateDesc);
    const allAuthors = data.objects.filter(types.isType('Person'));
    const allCategories = data.objects.filter(types.isType('BlogCategory'));
    const pageUrlPath = slug ? `/blog/${slug}` : '/blog';

    if (pageType === 'blog') {
        const postFeedLayout = data.objects.find(types.isType('PostFeedLayout'))!;
        const paginationData = getPaginationDataForPagePath(pageUrlPath, allPosts, postFeedLayout.numOfPostsPerPage);
        return {
            props: resolvePropsForPostFeedLayout(
                {
                    ...postFeedLayout,
                    ...paginationData
                },
                data.objects
            )
        };
    } else if (pageType === 'author') {
        const author = allAuthors.find((person) => person.slug === typeSlug)!;
        const posts = allPosts.filter((postLayout) => postLayout.author === author.__metadata.id);
        const paginationData = getPaginationDataForPagePath(pageUrlPath, posts, 0);
        return {
            props: resolvePropsForPostFeedLayout(
                {
                    __metadata: author.__metadata,
                    type: 'PostFeedLayout',
                    title: `Posts by ${author.firstName} ${author.lastName}`,
                    postFeed: {
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                data.objects
            )
        };
    } else if (pageType === 'category') {
        const category = allCategories.find((category) => category.slug === typeSlug)!;
        const categories = allPosts.filter((postLayout) => postLayout.category === category.__metadata.id);
        const paginationData = getPaginationDataForPagePath(pageUrlPath, categories, 0);
        return {
            props: resolvePropsForPostFeedLayout(
                {
                    __metadata: category.__metadata,
                    type: 'PostFeedLayout',
                    title: `Posts in ${category.title} category`,
                    postFeed: {
                        showAuthor: true,
                        showDate: true,
                        variant: 'variant-c'
                    },
                    ...paginationData
                },
                data.objects
            )
        };
    } else if (pageType === 'post') {
        const post = data.pages.find((post) => post.__metadata.urlPath === pageUrlPath)!;
        const props = resolvePropsForPostLayout(post, data.objects);
        return { props };
    } else {
        throw new Error(`could not resolve page for slug ${slug}`);
    }
};

function pageTypeFromSlug(pageUrlPath: string) {
    const parts = pageUrlPath.split('/');
    let pageType = 'blog';
    let typeSlug = null;
    let pageIndex = 0;
    if (parts.length === 1 && parts[0] !== "") {
        pageType = 'post';
        typeSlug = parts[0];
    } else if (['author', 'category', 'tag'].includes(parts[0])) {
        pageType = parts[0];
        typeSlug = parts[1];
        parts.splice(0, 2);
    }
    if (parts[0] === 'page' && parts.length === 2) {
        pageIndex = parseInt(parts[1]) - 1;
    }
    return {
        pageType,
        typeSlug,
        pageIndex
    };
}

function getPagedPathsForPagePath(pageUrlPath: string, items: any[], numOfItemsPerPage: number) {
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

function getPaginationDataForPagePath<T>(pageUrlPath: string, items: T[], numOfItemsPerPage: number): types.Pagination<T> {
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
