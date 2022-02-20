import * as React from 'react';
import type * as types from 'types';

import { DynamicComponent } from '../DynamicComponent';
import { resolvePropsForSections } from '../sections/mapSection';
import { toFieldPath } from '../../utils/annotations';

export type Props = Awaited<ReturnType<typeof resolveProps>>;

export const PageLayout: React.FC<Props> = (page) => {
    return (
        <main id="main" className="sb-layout sb-page-layout">
            {page.title && (
                <h1 className="sr-only" {...toFieldPath('title')}>
                    {page.title}
                </h1>
            )}
            {page.sections.length > 0 && (
                <div {...toFieldPath('sections')}>
                    {page.sections.map((section, index) => (
                        <DynamicComponent key={index} {...section} {...toFieldPath(`sections.${index}`)} />
                    ))}
                </div>
            )}
        </main>
    );
};

export const resolveProps = async (page: types.PageLayout, allDocuments: types.DocumentTypes[]) => {
    const sections = await resolvePropsForSections(page.sections, allDocuments);

    return {
        ...page,
        sections
    };
};
