import { SignJWT } from 'jose/jwt/sign';
import crypto from 'crypto';

import { resolveProps as resolvePropsForFeaturedPostsSection } from './FeaturedPostsSection';
import { resolveProps as resolvePropsForRecentPostsSection } from './RecentPostsSection';
import { resolveProps as resolvePropsForFeaturedPeopleSection } from './FeaturedPeopleSection';
import type * as types from 'types';

export const resolvePropsForSections = async (sections: types.Sections[], allDocuments: types.DocumentTypes[]) => {
    return Promise.all(
        sections?.map(async (section) => {
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
                    return resolvePropsForFormBlock(section.media);
                case 'ContactSection':
                    if (!section.form) {
                        return section;
                    }
                    return resolvePropsForFormBlock(section.form);
                default:
                    return section;
            }
        })
    );
};

async function resolvePropsForFormBlock(props: types.FormBlock) {
    if (!props.destination) {
        return props;
    }
    if (!process.env.STACKBIT_CONTACT_FORM_SECRET) {
        console.error(`No STACKBIT_CONTACT_FORM_SECRET provided. It will not work properly for production build.`);
        return props;
    }
    const secretKey = crypto.createHash('sha256').update(process.env.STACKBIT_CONTACT_FORM_SECRET).digest();
    const destination = await new SignJWT({ email: props.destination }).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);
    return {
        ...props,
        destination
    };
}
