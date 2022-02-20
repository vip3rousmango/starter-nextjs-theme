import { Props as PageLayoutProps } from './PageLayout';
import { Props as PostLayoutProps } from './PostLayout';
import { Props as PostFeedLayoutProps } from './PostFeedLayout';
import * as types from 'types';

export type AllPageLayoutProps = PageLayoutProps | PostLayoutProps | PostFeedLayoutProps;

export type PageProps = {
    site: types.ConfigWithEnv & { baseLayout: string | null };
    page: AllPageLayoutProps & { baseLayout: string | null };
};
