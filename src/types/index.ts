import type * as types from 'types';

export type Pagination<T> = {
    pageIndex: number;
    baseUrlPath: string;
    numOfPages: number;
    numOfTotalItems: number;
    items: T[];
};

// explicitly omit 'bottomSections' and set it to 'never' to ensure that pages like
// PostFeedLayout that don't render post's sections will not be bundled with unused data
export type PostLayoutResolvedWithoutSections = Omit<types.PostLayout, 'author' | 'category' | 'bottomSections'> & {
    author?: PersonProps;
    category?: CategoryProps;
    bottomSections?: never;
};

export type PersonProps = types.Person & { pageUrl?: string };

export type CategoryProps = types.BlogCategory & { pageUrl?: string };

export type Sections =
    | types.RecentPostsSection
    | types.FeaturedPeopleSection
    | types.HeroSection
    | types.CtaSection
    | types.QuoteSection
    | types.FaqSection
    | types.MediaGallerySection
    | types.JobsSection
    | types.ContactSection
    | types.FeaturedPostsSection
    | types.FeatureHighlightSection
    | types.FeaturedItemsSection
    | types.TestimonialsSection
    | types.TextSection;
