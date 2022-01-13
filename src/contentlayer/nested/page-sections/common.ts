import { elementId } from '../../common';

export const makeCommontSectionFields = () =>
    ({
        colors: {
            type: 'enum',
            options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
            default: 'colors-a'
        },
        elementId
    } as const);
