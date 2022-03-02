import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const ContactBlock = defineNestedType(() => ({
    name: 'ContactBlock',
    fields: {
        phoneNumber: { type: 'string', default: '850-123-5021' },
        phoneAltText: { type: 'string', default: 'Phone' },
        email: { type: 'string', default: 'jane@doe.com' },
        emailAltText: { type: 'string', default: 'Email' },
        address: { type: 'string', default: '123 Main St.' },
        addressAltText: { type: 'string', default: 'Address' },
        elementId
    }
}));
