import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Action } from '../atoms/Action';
import { Link } from '../atoms/Link';
import { ImageBlock } from '../blocks/ImageBlock';
import CloseIcon from '../svgs/close';
import MenuIcon from '../svgs/menu';
import type * as types from '.contentlayer/types';
import { FC } from 'react';

export type Props = types.Header & { styles: any; annotationPrefix: string };

export const Header: FC<Props> = (props) => {
    const primaryColors = props.primaryColors ?? 'colors-a';
    const headerStyles = props.styles?.self ?? {};
    const headerWidth = headerStyles.width ?? 'narrow';
    return (
        <header
            className={classNames(
                'sb-component',
                'sb-component-header',
                primaryColors,
                'relative',
                headerStyles.padding ?? 'py-5 px-4'
            )}
            data-sb-field-path={`${props.annotationPrefix}:header`}
        >
            <div className={classNames('mx-auto', mapMaxWidthStyles(headerWidth))}>
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants {...props} />
            </div>
        </header>
    );
};

const HeaderVariants: FC<Props> = (props) => {
    const headerVariant = props.headerVariant ?? 'variant-a';
    switch (headerVariant) {
        case 'variant-a':
            return <HeaderVariantA {...props} />;
        case 'variant-b':
            return <HeaderVariantB {...props} />;
        case 'variant-c':
            return <HeaderVariantC {...props} />;
        case 'variant-d':
            return <HeaderVariantD {...props} />;
        case 'variant-e':
            return <HeaderVariantE {...props} />;
    }
};

const HeaderVariantA: FC<Props> = (props) => {
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    return (
        <div className="relative flex items-center">
            {(props.logo || (props.title && props.isTitleVisible)) && (
                <div className="mr-8">
                    <SiteLogoLink {...props} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-8 space-x-8 lg:flex lg:items-center" data-sb-field-path=".primaryLinks">
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" data-sb-field-path=".secondaryLinks">
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantB: FC<Props> = (props) => {
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    return (
        <div className="relative flex items-center">
            {(props.logo || (props.title && props.isTitleVisible)) && <div className="mr-8">{SiteLogoLink(props)}</div>}
            {primaryLinks.length > 0 && (
                <ul
                    className="absolute hidden w-auto space-x-8 transform -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center left-1/2 top-1/2"
                    data-sb-field-path=".primaryLinks"
                >
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" data-sb-field-path=".secondaryLinks">
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantC: FC<Props> = (props) => {
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    return (
        <div className="relative flex items-center">
            {(props.logo || (props.title && props.isTitleVisible)) && <div className="mr-8">{SiteLogoLink(props)}</div>}
            {primaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" data-sb-field-path=".primaryLinks">
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul
                    className={classNames(
                        'hidden',
                        'lg:flex',
                        'lg:items-center',
                        'space-x-8',
                        primaryLinks.length > 0 ? 'ml-8' : 'ml-auto'
                    )}
                    data-sb-field-path=".secondaryLinks"
                >
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantD: FC<Props> = (props) => {
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    return (
        <div className="relative flex items-center">
            {(props.logo || (props.title && props.isTitleVisible)) && (
                <div className="mr-8 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
                    {SiteLogoLink(props)}
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden space-x-8 lg:flex lg:items-center" data-sb-field-path=".primaryLinks">
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" data-sb-field-path=".secondaryLinks">
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantE: FC<Props> = (props) => {
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    return (
        <>
            <div className="relative flex items-center">
                {(props.logo || (props.title && props.isTitleVisible)) && (
                    <div className="mr-8 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
                        {SiteLogoLink(props)}
                    </div>
                )}
                {secondaryLinks.length > 0 && (
                    <ul
                        className="hidden ml-auto space-x-8 lg:flex lg:items-center"
                        data-sb-field-path=".secondaryLinks"
                    >
                        {ListOfLinks({ links: secondaryLinks })}
                    </ul>
                )}
                {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
            </div>
            {primaryLinks.length > 0 && (
                <ul
                    className="hidden mt-4 space-x-8 lg:flex lg:items-center lg:justify-center"
                    data-sb-field-path=".primaryLinks"
                >
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
        </>
    );
};

const MobileMenu: FC<Props> = (props) => {
    const secondaryColors = props.secondaryColors ?? 'colors-a';
    const primaryLinks = props.primaryLinks ?? [];
    const secondaryLinks = props.secondaryLinks ?? [];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
            >
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="w-6 h-6 fill-current" />
            </button>
            <div
                className={classNames(
                    secondaryColors,
                    'fixed',
                    'inset-0',
                    'px-4',
                    'sm:px-8',
                    'py-5',
                    'overflow-y-auto',
                    'z-20',
                    isMenuOpen ? 'block' : 'hidden'
                )}
            >
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        {(props.logo || (props.title && props.isTitleVisible)) && SiteLogoLink(props)}
                        <button
                            aria-label="Close Menu"
                            title="Close Menu"
                            className="p-2 -mr-1 focus:outline-none"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <CloseIcon className="w-6 h-6 fill-current" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && (
                        <ul className="flex-grow mb-10 space-y-6" data-sb-field-path=".primaryLinks">
                            <ListOfLinks links={primaryLinks} inMobileMenu />
                        </ul>
                    )}
                    {secondaryLinks.length > 0 && (
                        <ul className="mb-10 space-y-5" data-sb-field-path=".secondaryLinks">
                            <ListOfLinks links={secondaryLinks} inMobileMenu />
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const SiteLogoLink: FC<types.Header> = (props) => {
    return (
        <Link
            href="/"
            aria-label={props.title}
            className="flex items-center sb-header-logo"
            data-sb-field-path=".title#span[1] .logo#img[1]"
        >
            {props.logo && (
                <ImageBlock {...props.logo} className={classNames('max-h-12', { 'mr-2': props.isTitleVisible })} />
            )}
            {props.title && props.isTitleVisible && <span className="text-2xl tracking-wide">{props.title}</span>}
        </Link>
    );
};

type Action = types.Button | types.Link;

const ListOfLinks: FC<{ links: Action[]; inMobileMenu?: boolean }> = ({ links, inMobileMenu = false }) => {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Action
                        {...link}
                        className={classNames(inMobileMenu && link.type === 'Button' ? 'w-full' : '')}
                        data-sb-field-path={`.${index}`}
                    />
                </li>
            ))}
        </>
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
