export type Pagination<T> = {
    pageIndex: number;
    baseUrlPath: string;
    numOfPages: number;
    numOfTotalItems: number;
    items: T[];
};
