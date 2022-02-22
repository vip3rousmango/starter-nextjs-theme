import type * as types from 'types';

import { Props as FeaturedPostsSectionProps} from './FeaturedPostsSection';
import { Props as RecentPostsSectionProps} from './RecentPostsSection';
import { Props as FeaturedPeopleSectionProps} from './FeaturedPeopleSection';
import { resolveProps as resolvePropsForFeaturedPeopleSection } from './FeaturedPeopleSection/resolveProps';
import { resolveProps as resolvePropsForFeaturedPostsSection } from './FeaturedPostsSection/resolveProps';
import { resolveProps as resolvePropsForRecentPostsSection } from './RecentPostsSection/resolveProps';
import { resolveProps as resolvePropsForFormBlock } from '../blocks/FormBlock/resolveProps';

export type SectionsProps =
    | Exclude<types.Sections, types.RecentPostsSection | types.FeaturedPostsSection | types.FeaturedPeopleSection>
    | RecentPostsSectionProps
    | FeaturedPostsSectionProps
    | FeaturedPeopleSectionProps;

export const mapSectionProps = async (sections: types.Sections[], allDocuments: types.DocumentTypes[]): Promise<SectionsProps[]> => {
    return Promise.all(
        (sections ?? []).map(async (section) => {
            switch (section.type) {
                case 'FeaturedPostsSection':
                    return resolvePropsForFeaturedPostsSection(section, allDocuments);
                case 'RecentPostsSection':
                    return resolvePropsForRecentPostsSection(section, allDocuments);
                case 'FeaturedPeopleSection':
                    return resolvePropsForFeaturedPeopleSection(section, allDocuments);
                case 'HeroSection':
                    if (section.media?.type !== 'FormBlock') {
                        return section;
                    }
                    return {
                        ...section,
                        media: await resolvePropsForFormBlock(section.media)
                    };
                case 'ContactSection':
                    if (!section.form) {
                        return section;
                    }
                    return {
                        ...section,
                        form: await resolvePropsForFormBlock(section.form)
                    };
                default:
                    return section;
            }
        })
    );
};
