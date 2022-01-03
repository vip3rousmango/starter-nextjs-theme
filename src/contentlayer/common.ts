import { RecentPostsSection } from './nested/RecentPostsSection';

export const elementId = {
    type: 'string',
    description: 'The unique ID for an HTML element, must not contain whitespace',
    default: ''
} as const;

export const sectionComponent = [RecentPostsSection];
