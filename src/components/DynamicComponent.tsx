import type { ComponentType, FC } from 'react';
import dynamic from 'next/dynamic';
import type { Props as PageLayoutProps } from './layouts/PageLayout';
import type { Props as PostLayoutProps } from './layouts/PostLayout';
import type { Props as PostFeedLayoutProps } from './layouts/PostFeedLayout';
import type { Props as ImageBlockProps } from './blocks/ImageBlock';
import type { Props as VideoBlockProps } from './blocks/VideoBlock';
import type { Props as FormBlockProps } from './blocks/FormBlock';
import type { Props as HeroSectionProps } from './sections/HeroSection';
import type { Props as FeatureHighlightSectionProps } from './sections/FeatureHighlightSection';
import type { Props as FeaturedItemsSectionProps } from './sections/FeaturedItemsSection';
import type { Props as FeaturedPostsSectionProps } from './sections/FeaturedPostsSection';
import type { Props as FeaturedPeopleSectionProps } from './sections/FeaturedPeopleSection';
import type { Props as RecentPostsSectionProps } from './sections/RecentPostsSection';
import type { Props as MediaGallerySectionProps } from './sections/MediaGallerySection';
import type { Props as FaqSectionProps } from './sections/FaqSection';
import type { Props as QuoteSectionProps } from './sections/QuoteSection';
import type { Props as TestimonialsSectionProps } from './sections/TestimonialsSection';
import type { Props as TextSectionProps } from './sections/TextSection';
import type { Props as CtaSectionProps } from './sections/CtaSection';
import type { Props as ContactSectionProps } from './sections/ContactSection';
import type { Props as JobsSectionProps } from './sections/JobsSection';
import type { Props as EmailFormControlProps } from './blocks/FormBlock/EmailFormControl';
import type { Props as CheckboxFormControlProps } from './blocks/FormBlock/CheckboxFormControl';
import type { Props as SelectFormControlProps } from './blocks/FormBlock/SelectFormControl';
import type { Props as TextFormControlProps } from './blocks/FormBlock/TextFormControl';
import type { Props as TextareaFormControlProps } from './blocks/FormBlock/TextareaFormControl';

export type Props =
    | PageLayoutProps
    | PostLayoutProps
    | PostFeedLayoutProps
    | ImageBlockProps
    | VideoBlockProps
    | FormBlockProps
    | HeroSectionProps
    | FeatureHighlightSectionProps
    | FeaturedItemsSectionProps
    | FeaturedPostsSectionProps
    | FeaturedPeopleSectionProps
    | RecentPostsSectionProps
    | MediaGallerySectionProps
    | FaqSectionProps
    | QuoteSectionProps
    | TestimonialsSectionProps
    | TextSectionProps
    | CtaSectionProps
    | ContactSectionProps
    | JobsSectionProps
    | EmailFormControlProps
    | CheckboxFormControlProps
    | SelectFormControlProps
    | TextFormControlProps
    | TextareaFormControlProps;

type ComponentsMap = {
    [P in Props as P['type']]: ComponentType<P>;
};

const componentsMap: ComponentsMap = {
    // layouts
    PageLayout: dynamic(() => namedComponent(import('./layouts/PageLayout'), 'PageLayout')),
    PostLayout: dynamic(() => namedComponent(import('./layouts/PostLayout'), 'PostLayout')),
    PostFeedLayout: dynamic(() => namedComponent(import('./layouts/PostFeedLayout'), 'PostFeedLayout')),

    // blocks
    ImageBlock: dynamic(() => namedComponent(import('./blocks/ImageBlock'), 'ImageBlock')),
    VideoBlock: dynamic(() => namedComponent(import('./blocks/VideoBlock'), 'VideoBlock')),
    FormBlock: dynamic(() => namedComponent(import('./blocks/FormBlock'), 'FormBlock')),

    // sections
    HeroSection: dynamic(() => namedComponent(import('./sections/HeroSection'), 'HeroSection')),
    FeatureHighlightSection: dynamic(() => namedComponent(import('./sections/FeatureHighlightSection'), 'FeatureHighlightSection')),
    FeaturedItemsSection: dynamic(() => namedComponent(import('./sections/FeaturedItemsSection'), 'FeaturedItemsSection')),
    FeaturedPostsSection: dynamic(() => namedComponent(import('./sections/FeaturedPostsSection'), 'FeaturedPostsSection')),
    FeaturedPeopleSection: dynamic(() => namedComponent(import('./sections/FeaturedPeopleSection'), 'FeaturedPeopleSection')),
    RecentPostsSection: dynamic(() => namedComponent(import('./sections/RecentPostsSection'), 'RecentPostsSection')),
    MediaGallerySection: dynamic(() => namedComponent(import('./sections/MediaGallerySection'), 'MediaGallerySection')),
    FaqSection: dynamic(() => namedComponent(import('./sections/FaqSection'), 'FaqSection')),
    QuoteSection: dynamic(() => namedComponent(import('./sections/QuoteSection'), 'QuoteSection')),
    TestimonialsSection: dynamic(() => namedComponent(import('./sections/TestimonialsSection'), 'TestimonialsSection')),
    TextSection: dynamic(() => namedComponent(import('./sections/TextSection'), 'TextSection')),
    CtaSection: dynamic(() => namedComponent(import('./sections/CtaSection'), 'CtaSection')),
    ContactSection: dynamic(() => namedComponent(import('./sections/ContactSection'), 'ContactSection')),
    JobsSection: dynamic(() => namedComponent(import('./sections/JobsSection'), 'JobsSection')),

    // form controls
    EmailFormControl: dynamic(() => namedComponent(import('./blocks/FormBlock/EmailFormControl'), 'EmailFormControl')),
    CheckboxFormControl: dynamic(() => namedComponent(import('./blocks/FormBlock/CheckboxFormControl'), 'CheckboxFormControl')),
    SelectFormControl: dynamic(() => namedComponent(import('./blocks/FormBlock/SelectFormControl'), 'SelectFormControl')),
    TextFormControl: dynamic(() => namedComponent(import('./blocks/FormBlock/TextFormControl'), 'TextFormControl')),
    TextareaFormControl: dynamic(() => namedComponent(import('./blocks/FormBlock/TextareaFormControl'), 'TextareaFormControl'))
};

export const DynamicComponent: FC<Props> = (props) => {
    const Component = componentsMap[props.type] as ComponentType<Props>;
    if (!Component) {
        throw new Error(`No component found for ${JSON.stringify(props, null, 2)}`);
    }
    return <Component {...props} />;
};

const namedComponent = async <T, N extends keyof T>(modPromise: Promise<T>, exportName: N) => {
    const mod = await modPromise;
    return mod[exportName];
};
