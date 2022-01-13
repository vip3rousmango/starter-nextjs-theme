import { FaqSection } from './nested/page-sections/FaqSection';
import { FeaturedPeopleSection } from './nested/FeaturedPeopleSection';
import { HeroSection } from './nested/page-sections/HeroSection';
import { MediaGallerySection } from './nested/page-sections/MediaGallerySection';
import { QuoteSection } from './nested/page-sections/QuoteSection';
import { RecentPostsSection } from './nested/RecentPostsSection';
import { JobsSection } from './nested/page-sections/JobsSection';
import { ContactSection } from './nested/page-sections/ContactSection';
import { FeaturedPostsSection } from './nested/page-sections/FeaturedPostsSection';
import { FeatureHighlightSection } from './nested/page-sections/FeatureHighlightSection';
import { FeaturedItemsSection } from './nested/page-sections/FeaturedItemsSection';
import { TestimonialsSection } from './nested/page-sections/TestimonialsSection';
import { CtaSection } from './nested/page-sections/CtaSection';

export const elementId = {
    type: 'string',
    description: 'The unique ID for an HTML element, must not contain whitespace',
    default: ''
} as const;

export const colors = {
    type: 'enum',
    options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
    default: 'colors-a'
} as const;

export const sectionComponent = [
    RecentPostsSection,
    FeaturedPeopleSection,
    HeroSection,
    CtaSection,
    QuoteSection,
    FaqSection,
    MediaGallerySection,
    JobsSection,
    ContactSection,
    FeaturedPostsSection,
    FeatureHighlightSection,
    FeaturedItemsSection,
    TestimonialsSection
];
