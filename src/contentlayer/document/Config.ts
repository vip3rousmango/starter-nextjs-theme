import { defineDocumentType, defineNestedType } from 'contentlayer/source-files';
import { Button } from '../nested/Button';
import { ContactBlock } from '../nested/ContactBlock';
import { ImageBlock } from '../nested/ImageBlock';
import { Link } from '../nested/Link';
import { Social } from '../nested/Social';
import { MetaTag } from '../nested/MetaTag';

export const Config = defineDocumentType(() => ({
    name: 'Config',
    bodyType: 'none',
    isSingleton: true,
    fields: {
        favicon: { type: 'string', default: 'https://assets.stackbit.com/components/images/default/favicon.svg' },
        header: { type: 'nested', of: Header },
        footer: { type: 'nested', of: Footer },
        titleSuffix: { type: 'string' },
        defaultSocialImage: { type: 'string' },
        defaultMetaTags: {
            type: 'list',
            of: MetaTag
        }
    },
    extensions: {
        stackbit: {
            label: 'Site configuration',
            // readOnly: true,
            fields: {
                favicon: { label: 'Favicon' },
                header: { label: 'Header configuration' },
                footer: { label: 'Footer configuration' }
            }
        }
    }
}));

const Header = defineNestedType(() => ({
    name: 'Header',
    fields: {
        headerVariant: {
            type: 'enum',
            options: ['variant-a', 'variant-b', 'variant-c', 'variant-d', 'variant-e'],
            default: 'variant-c'
        },
        primaryColors: {
            type: 'enum',
            options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
            default: 'colors-a'
        },
        secondaryColors: {
            type: 'enum',
            options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
            default: 'colors-a'
        },
        title: {
            type: 'string',
            default: 'Your Brand'
        },
        isTitleVisible: {
            type: 'boolean',
            default: true
        },
        logo: {
            type: 'nested',
            of: ImageBlock,
            default: {
                type: ImageBlock,
                url: 'https://assets.stackbit.com/components/images/default/default-image.png',
                altText: 'Your logo image',
                caption: ''
            }
        },
        primaryLinks: {
            type: 'list',
            of: [Link, Button],
            default: [
                { type: 'Link', label: 'Home', url: '/', altText: 'Home' },
                { type: 'Link', label: 'Blog', url: '/', altText: 'Blog' }
            ]
        },
        secondaryLinks: {
            type: 'list',
            of: [Link, Button],
            default: [{ type: 'Button', label: 'Sign up', url: '/', altText: 'Sign up', style: 'primary' }]
        },
        styles: {
            type: 'json',
            default: {
                self: {
                    width: 'narrow',
                    padding: ['pt-5', 'pb-5', 'pl-4', 'pr-4']
                }
            }
        }
    },
    extensions: {
        stackbit: {
            label: 'Header',
            labelField: 'title',
            fields: {
                headerVariant: { label: 'Header arrangement', group: 'styles' },
                primaryColors: { label: 'Primary colors', group: 'styles' },
                secondaryColors: { label: 'Secondary colors (mobile menu)', group: 'styles' },
                title: { label: 'Title' },
                isTitleVisible: { label: 'Display title' },
                logo: { label: 'Logo' },
                primaryLinks: { label: 'Primary navigation links' },
                secondaryLinks: { label: 'Secondary links' }
            },
            fieldGroups: [
                { name: 'styles', label: 'Styles' },
                { name: 'settings', label: 'Settings' }
            ]
        }
    }
}));

const Footer = defineNestedType(() => ({
    name: 'Footer',
    fields: {
        colors: {
            type: 'enum',
            options: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h'],
            default: 'colors-a'
        },
        logo: {
            type: 'nested',
            of: ImageBlock,
            default: {
                type: 'ImageBlock',
                url: 'https://assets.stackbit.com/components/images/default/default-image.png',
                altText: 'Your logo image',
                caption: ''
            }
        },
        title: {
            type: 'string',
            default: 'Your Brand'
        },
        text: {
            type: 'markdown'
            // default: 'A description of your brand'
        },
        contacts: {
            type: 'nested',
            of: ContactBlock,
            default: {
                phoneNumber: '850-123-5021',
                phoneAltText: 'Call us',
                email: 'john@doe.com',
                emailAltText: 'Email us'
            }
        },
        copyrightText: {
            type: 'markdown',
            default: 'Copyright text'
        },
        primaryLinks: {
            type: 'list',
            of: [Link, Button],
            default: [
                { type: 'Link', label: 'Projects', url: '/', altText: 'Projects' },
                { type: 'Link', label: 'Documentation', url: '/', altText: 'Documentation' }
            ]
        },
        socialLinks: {
            type: 'list',
            of: [Social],
            default: [
                {
                    type: 'facebook',
                    icon: 'facebook',
                    label: '',
                    altText: 'facebook',
                    url: '/',
                    elementId: false,
                    showIcon: true
                },
                {
                    type: 'twitter',
                    icon: 'twitter',
                    label: '',
                    altText: 'twitter',
                    url: '/',
                    elementId: false,
                    showIcon: true
                }
            ]
        },
        legalLinks: {
            type: 'list',
            of: [Link, Button],
            default: [
                { type: 'Link', label: 'Privacy Policy', url: '/', altText: 'Privacy Policy' },
                { type: 'Link', label: 'Terms & Conditions', url: '/', altText: 'Terms & Conditions' }
            ]
        },
        styles: {
            type: 'json',
            default: {
                self: {
                    width: 'narrow',
                    padding: ['pt-16', 'pb-16', 'pl-4', 'pr-4']
                }
            }
        }
    },
    extensions: {
        stackbit: {
            label: 'Footer',
            labelField: 'title',
            fields: {
                colors: { label: 'Colors' },
                logo: { label: 'Logo' },
                title: { label: 'Title' },
                text: { label: 'Text' },
                contacts: { label: 'Contacts' },
                copyrightText: { label: 'Copyright text' },
                socialLinks: { label: 'Social links' },
                legalLinks: { label: 'Legal navigation links' }
            },
            fieldGroups: [
                { name: 'styles', label: 'Styles' },
                { name: 'settings', label: 'Settings' }
            ]
        }
    }
}));
