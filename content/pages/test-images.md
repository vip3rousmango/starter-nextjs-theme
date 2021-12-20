---
title: Test Images
layout: PageLayout
sections:
  - type: NextImageFillSection
    elementId: image-fill
    colors: colors-a
    title: Next Image section, Layout Fill
    text: |-
      When `fill`, the image will stretch both width and height to the dimensions of the parent element, provided the parent element is relative.

      This is usually paired with the objectFit property.

      Ensure the parent element has `position: relative` in their stylesheet.
    url: /images/hero-3.jpg
    altText: Image alt text
    aspectRatio: '16:9'
  - type: NextImageResponsiveSection
    elementId: image-responsive
    colors: colors-a
    title: Next Image section, Layout Responsive
    text: |-
      When `responsive`, the image will scale the dimensions down for smaller viewports and scale up for larger viewports.

      Ensure the parent element uses `display: block` in their stylesheet.
    url: /images/hero-3.jpg
    altText: Image alt text
---
