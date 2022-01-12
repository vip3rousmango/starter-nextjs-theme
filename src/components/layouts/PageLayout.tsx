import * as React from 'react';

import { getBaseLayoutComponent } from '../../utils/base-layout';
import * as types from '.contentlayer/types';
import { FC } from 'react';
import { DynamicComponent } from '../DynamicComponent';
import { mapSections } from '../sections/mapSection';

export type Props = ReturnType<typeof resolveProps>;

export const PageLayout: FC<Props> = (props) => {
  const { page, site } = props;
  const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);

  return (
    <BaseLayout page={page} site={site}>
      <main id="main" className="sb-layout sb-page-layout">
        {page.title && (
          <h1 className="sr-only" data-sb-field-path="title">
            {page.title}
          </h1>
        )}
        {page.sections.length > 0 && (
          <div data-sb-field-path="sections">
            {page.sections.map((section, index) => (
              <DynamicComponent key={index} {...section} data-sb-field-path={`sections.${index}`} />
            ))}
          </div>
        )}
      </main>
    </BaseLayout>
  );
};

export const resolveProps = (page: types.PageLayout, allDocuments: types.DocumentTypes[]) => {
  const config = allDocuments.filter(types.isType('Config'))[0]!;
  const sections = mapSections(page.sections, allDocuments);

  return {
    site: { ...config, baseLayout: null },
    page: { ...page, sections, baseLayout: null }
  };
};
