import { BlogCategory, Config, Person, PostLayout } from './content';

export type Pagination<T> = {
    pageIndex: number;
    baseUrlPath: string;
    numOfPages: number;
    numOfTotalItems: number;
    items: T[];
};

export type PostLayoutResolved = Omit<PostLayout, 'author' | 'category'> & {
    author?: Person;
    category?: BlogCategory;
};

export type ConfigWithEnv = Config & { env: any };
