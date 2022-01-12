import { resolveProps as resolvePropsForFeaturedPostsSection } from './FeaturedPostsSection';
import { resolveProps as resolvePropsForRecentPostsSection } from './RecentPostsSection';
import { resolveProps as resolvePropsForFeaturedPeopleSection } from './FeaturedPeopleSection';
import { resolveProps as resolvePropsForPagedPostsSection } from './PagedPostsSection';
import * as types from '.contentlayer/types';

type Section =
  | types.CtaSection
  | types.FaqSection
  | types.HeroSection
  | types.JobsSection
  | types.QuoteSection
  | types.ContactSection
  | types.FeaturedPostsSection
  | types.RecentPostsSection
  | types.PagedPostsSection
  | types.MediaGallerySection
  | types.TestimonialsSection
  | types.FeaturedItemsSection
  | types.FeaturedPeopleSection
  | types.FeatureHighlightSection;

export const mapSections = (sections: Section[], allDocuments: types.DocumentTypes[]) => {
  return sections?.map((section) => {
    switch (section.type) {
      case 'FeaturedPostsSection':
        return resolvePropsForFeaturedPostsSection(section, allDocuments);
      case 'RecentPostsSection':
        return resolvePropsForRecentPostsSection(section, allDocuments);
      case 'FeaturedPeopleSection':
        return resolvePropsForFeaturedPeopleSection(section, allDocuments);
      case 'PagedPostsSection':
        return resolvePropsForPagedPostsSection(section);
      default:
        return section;
    }
  });
};
