import type * as types from 'types';

import { findPeople } from '../../../utils/static-resolver-utils';
import type { Props as FeaturedPeopleSectionProps } from './index';

export const mapProps = (section: types.FeaturedPeopleSection, allDocuments: types.DocumentTypes[]): FeaturedPeopleSectionProps => {
    const allPeople = findPeople(allDocuments);
    const people = (section.people ?? [])
        .map((personId) => allPeople.find((person) => person.__metadata.id === personId))
        .filter((person): person is types.Person => !!person);

    return { ...section, people };
};
