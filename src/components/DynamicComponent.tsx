import type { FC } from 'react';
import dynamic from 'next/dynamic';
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
import type { Props as CtaSectionProps } from './sections/CtaSection';
import type { Props as ContactSectionProps } from './sections/ContactSection';
import type { Props as JobsSectionProps } from './sections/JobsSection';
import type { Props as EmailFormControlProps } from './blocks/FormBlock/EmailFormControl';
import type { Props as CheckboxFormControlProps } from './blocks/FormBlock/CheckboxFormControl';
import type { Props as SelectFormControlProps } from './blocks/FormBlock/SelectFormControl';
import type { Props as TextFormControlProps } from './blocks/FormBlock/TextFormControl';
import type { Props as TextareaFormControlProps } from './blocks/FormBlock/TextareaFormControl';

export type Props =
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
    | CtaSectionProps
    | ContactSectionProps
    | JobsSectionProps
    | EmailFormControlProps
    | CheckboxFormControlProps
    | SelectFormControlProps
    | TextFormControlProps
    | TextareaFormControlProps;

export const DynamicComponent: FC<Props> = (props) => {
    switch (props.type) {
        // blog layouts
        case 'PostLayout':
            const PostLayout = dynamic(() => namedComponent(import('./layouts/PostLayout'), 'PostLayout'));
            return <PostLayout {...props} />;
        case 'PostFeedLayout':
            const PostFeedLayout = dynamic(() => namedComponent(import('./layouts/PostFeedLayout'), 'PostFeedLayout'));
            return <PostFeedLayout {...props} />;
        // blocks
        case 'ImageBlock':
            const ImageBlock = dynamic(() => namedComponent(import('./blocks/ImageBlock'), 'ImageBlock'));
            return <ImageBlock {...props} />;
        case 'VideoBlock':
            const VideoBlock = dynamic(() => namedComponent(import('./blocks/VideoBlock'), 'VideoBlock'));
            return <VideoBlock {...props} />;
        case 'FormBlock':
            const FormBlock = dynamic(() => namedComponent(import('./blocks/FormBlock'), 'FormBlock'));
            return <FormBlock {...props} />;
        // sections
        case 'HeroSection':
            const HeroSection = dynamic(() => namedComponent(import('./sections/HeroSection'), 'HeroSection'));
            return <HeroSection {...props} />;
        case 'FeatureHighlightSection':
            const FeatureHighlightSection = dynamic(() => namedComponent(import('./sections/FeatureHighlightSection'), 'FeatureHighlightSection'));
            return <FeatureHighlightSection {...props} />;
        case 'FeaturedItemsSection':
            const FeaturedItemsSection = dynamic(() => namedComponent(import('./sections/FeaturedItemsSection'), 'FeaturedItemsSection'));
            return <FeaturedItemsSection {...props} />;
        case 'FeaturedPostsSection':
            const FeaturedPostsSection = dynamic(() => namedComponent(import('./sections/FeaturedPostsSection'), 'FeaturedPostsSection'));
            return <FeaturedPostsSection {...props} />;
        case 'FeaturedPeopleSection':
            const FeaturedPeopleSection = dynamic(() => namedComponent(import('./sections/FeaturedPeopleSection'), 'FeaturedPeopleSection'));
            return <FeaturedPeopleSection {...props} />;
        case 'RecentPostsSection':
            const RecentPostsSection = dynamic(() => namedComponent(import('./sections/RecentPostsSection'), 'RecentPostsSection'));
            return <RecentPostsSection {...props} />;
        case 'MediaGallerySection':
            const MediaGallerySection = dynamic(() => namedComponent(import('./sections/MediaGallerySection'), 'MediaGallerySection'));
            return <MediaGallerySection {...props} />;
        case 'FaqSection':
            const FaqSection = dynamic(() => namedComponent(import('./sections/FaqSection'), 'FaqSection'));
            return <FaqSection {...props} />;
        case 'QuoteSection':
            const QuoteSection = dynamic(() => namedComponent(import('./sections/QuoteSection'), 'QuoteSection'));
            return <QuoteSection {...props} />;
        case 'TestimonialsSection':
            const TestimonialsSection = dynamic(() => namedComponent(import('./sections/TestimonialsSection'), 'TestimonialsSection'));
            return <TestimonialsSection {...props} />;
        case 'CtaSection':
            const CtaSection = dynamic(() => namedComponent(import('./sections/CtaSection'), 'CtaSection'));
            return <CtaSection {...props} />;
        case 'ContactSection':
            const ContactSection = dynamic(() => namedComponent(import('./sections/ContactSection'), 'ContactSection'));
            return <ContactSection {...props} />;
        case 'JobsSection':
            const JobsSection = dynamic(() => namedComponent(import('./sections/JobsSection'), 'JobsSection'));
            return <JobsSection {...props} />;
        // form control
        case 'EmailFormControl':
            const EmailFormControl = dynamic(() => namedComponent(import('./blocks/FormBlock/EmailFormControl'), 'EmailFormControl'));
            return <EmailFormControl {...props} />;
        case 'CheckboxFormControl':
            const CheckboxFormControl = dynamic(() => namedComponent(import('./blocks/FormBlock/CheckboxFormControl'), 'CheckboxFormControl'));
            return <CheckboxFormControl {...props} />;
        case 'SelectFormControl':
            const SelectFormControl = dynamic(() => namedComponent(import('./blocks/FormBlock/SelectFormControl'), 'SelectFormControl'));
            return <SelectFormControl {...props} />;
        case 'TextFormControl':
            const TextFormControl = dynamic(() => namedComponent(import('./blocks/FormBlock/TextFormControl'), 'TextFormControl'));
            return <TextFormControl {...props} />;
        case 'TextareaFormControl':
            const TextareaFormControl = dynamic(() => namedComponent(import('./blocks/FormBlock/TextareaFormControl'), 'TextareaFormControl'));
            return <TextareaFormControl {...props} />;
        default:
            throw new Error(`No component found for ${JSON.stringify(props, null, 2)}`);
    }
};

const namedComponent = async <T, N extends keyof T>(modPromise: Promise<T>, exportName: N) => {
    const mod = await modPromise;
    return mod[exportName];
};
