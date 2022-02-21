import { BlogCategory, Config, Person, PostLayout } from './content';

export type Pagination<T> = {
    pageIndex: number;
    baseUrlPath: string;
    numOfPages: number;
    numOfTotalItems: number;
    items: T[];
};

export type PostLayoutResolved = Omit<PostLayout, 'author' | 'category'> & {
    author?: PersonResolved;
    category?: BlogCategoryResolved;
};

export type PersonResolved = Person & {
    pageUrl?: string;
}

export type BlogCategoryResolved = BlogCategory & {
    pageUrl?: string;
}

export type ConfigWithEnv = Config & { env: any };
