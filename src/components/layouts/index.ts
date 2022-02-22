import * as types from 'types';

import { Props as PageLayoutProps } from './PageLayout';
import { Props as PostLayoutProps } from './PostLayout';
import { Props as PostFeedLayoutProps } from './PostFeedLayout';

export type AllPageLayoutProps = PageLayoutProps | PostLayoutProps | PostFeedLayoutProps;

export type Site = types.Config & { env?: any; baseLayout?: string };

export type PageProps<T extends AllPageLayoutProps> = {
    site: Site;
    page: T & { baseLayout?: string };
};
