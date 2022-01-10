import * as React from 'react';

import { getBaseLayoutComponent } from '../../utils/base-layout';
import { getComponent } from '../components-registry';
import type * as types from '.contentlayer/types';
import { TMPBaseLayout } from '../../tmp';
import { FC } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeatureHighlightSection } from '../sections/FeatureHighlightSection';
import { FeaturedItemsSection } from '../sections/FeaturedItemsSection';
import { MediaGallerySection } from '../sections/MediaGallerySection';
import { PostFeedSection } from '../sections/PostFeedSection';
import { FaqSection } from '../sections/FaqSection';
import { QuoteSection } from '../sections/QuoteSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CtaSection } from '../sections/CtaSection';
import { ContactSection } from '../sections/ContactSection';

export type Props = {
  site: types.Config & TMPBaseLayout;
  page: types.PageLayout & TMPBaseLayout;
};

export const PageLayout: FC<Props> = (props) => {
  const { page, site } = props;
  const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
  const sections = page.sections ?? [];

  return (
    <BaseLayout page={page} site={site}>
      <main id="main" className="sb-layout sb-page-layout">
        {page.title && (
          <h1 className="sr-only" data-sb-field-path="title">
            {page.title}
          </h1>
        )}
        {sections.length > 0 && (
          <div data-sb-field-path="sections">
            {sections.map((section, index) => {
              switch (section.type) {
                case 'HeroSection':
                  return <HeroSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'FeatureHighlightSection':
                  return <FeatureHighlightSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'FeaturedItemsSection':
                  return <FeaturedItemsSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'MediaGallerySection':
                  return <MediaGallerySection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'FeaturedPostsSection':
                  return <PostFeedSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'FaqSection':
                  return <FaqSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'QuoteSection':
                  return <QuoteSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'TestimonialsSection':
                  return <TestimonialsSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'CtaSection':
                  return <CtaSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
                case 'ContactSection':
                  return <ContactSection key={index} {...section} data-sb-field-path={`sections.${index}`} />;
              }
              const Component = getComponent(section.type);
              if (!Component) {
                throw new Error(`no component matching the page section's type: ${section.type}`);
              }
              return <Component key={index} {...section} data-sb-field-path={`sections.${index}`} />;
            })}
          </div>
        )}
      </main>
    </BaseLayout>
  );
};

// export const resolveProps = (page: types.PageLayout): Props => {
//   return
// }
