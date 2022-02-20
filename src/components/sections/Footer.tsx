import * as React from 'react';
import classNames from 'classnames';

import type * as types from 'types';
import { ImageBlock } from '../blocks/ImageBlock';
import { Action } from '../atoms/Action';
import { Social } from '../atoms/Social';
import { Link } from '../atoms/Link';
import { Markdown } from '../Markdown';
import { StackbitObjectId, getObjectId, toFieldPath } from '../../utils/annotations';

type Props = types.Footer & StackbitObjectId;

export const Footer: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const footerStyles = props.styles?.self ?? {};
    const footerWidth = footerStyles.width ?? 'narrow';
    const primaryLinks = props.primaryLinks ?? [];
    const socialLinks = props.socialLinks ?? [];
    const legalLinks = props.legalLinks ?? [];
    const objectId = getObjectId(props);
    const fieldPath = objectId ? `${objectId}:footer` : null;
    return (
        <footer className={classNames('sb-component', 'sb-component-footer', colors, footerStyles.padding ?? 'py-16 px-4')} {...toFieldPath(fieldPath)}>
            <div className={classNames('mx-auto', mapMaxWidthStyles(footerWidth))}>
                {(props.logo || props.title || props.text) && (
                    <div className="mb-12">
                        <Link href="/" className="flex items-center sb-footer-logo" {...toFieldPath('.title#span[1]', '.logo#img[1]')}>
                            {props.logo && <ImageBlock {...props.logo} className={classNames('max-h-12', { 'mr-2': props.title })} />}
                            {props.title && <span className="text-2xl tracking-wide">{props.title}</span>}
                        </Link>
                        {props.text && (
                            <Markdown
                                text={props.text}
                                className={classNames('sb-markdown', 'max-w-xl', { 'mt-8': props.title || props.logo })}
                                fieldName="text"
                            />
                        )}
                    </div>
                )}
                {(primaryLinks.length > 0 || socialLinks.length > 0 || props.contacts) && (
                    <div className="sm:flex sm:justify-between sm:items-end">
                        {primaryLinks.length > 0 && (
                            <div className="mb-6">
                                <ul className="flex flex-col items-start mb-6 space-y-6 text-lg" {...toFieldPath('.primaryLinks')}>
                                    {primaryLinks.map((link, index) => (
                                        <li key={index}>
                                            <Action {...link} {...toFieldPath(`.${index}`)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {(socialLinks.length > 0 || props.contacts) && (
                            <div className="mb-6">
                                {socialLinks.length > 0 && (
                                    <ul className="flex items-center mb-6 space-x-10" {...toFieldPath('.socialLinks')}>
                                        {socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <Social {...link} {...toFieldPath(`.${index}`)} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {props.contacts && <Contacts {...props.contacts} />}
                            </div>
                        )}
                    </div>
                )}
                <div className="sb-divider" />
                <div className="flex flex-col-reverse justify-between pt-6 lg:flex-row">
                    {props.copyrightText && <Markdown text={props.copyrightText} fieldName="copyrightText" />}
                    {legalLinks.length > 0 && (
                        <ul className="flex flex-col mb-6 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row" {...toFieldPath('.legalLinks')}>
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Action {...link} {...toFieldPath(`.${index}`)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </footer>
    );
};

const Contacts: React.FC<types.ContactBlock> = (props) => {
    return (
        <div className="mb-6 space-y-4 text-lg" {...toFieldPath('.contacts')}>
            {props.phoneNumber && (
                <p>
                    <a
                        href={`tel:${props.phoneNumber}`}
                        aria-label={props.phoneAltText}
                        title={props.phoneAltText}
                        {...toFieldPath('.phoneNumber', '.phoneNumber#@href', '.phoneAltText#@title')}
                    >
                        {props.phoneNumber}
                    </a>
                </p>
            )}
            {props.email && (
                <p>
                    <a
                        href={`mailto:${props.email}`}
                        aria-label={props.emailAltText}
                        title={props.emailAltText}
                        {...toFieldPath('.email', '.email#@href', '.emailAltText#@title')}
                    >
                        {props.email}
                    </a>
                </p>
            )}
            {props.address && (
                <p>
                    <a
                        href={`https://www.google.com/maps/search/${props.address}`}
                        aria-label={props.addressAltText}
                        title={props.addressAltText}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...toFieldPath('.address', '.address#@href', '.addressAltText#@title')}
                    >
                        {props.address}
                    </a>
                </p>
            )}
        </div>
    );
};

function mapMaxWidthStyles(width: string) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-xl';
        case 'wide':
            return 'max-w-screen-2xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
