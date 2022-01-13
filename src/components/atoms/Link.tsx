import * as React from 'react';
import NextLink from 'next/link';

import type * as types from '.contentlayer/types';
import { FC } from 'react';
import { StackbitFieldPath } from '../../utils/stackbit';

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export type Props = { href: string } & AnchorProps & Partial<StackbitFieldPath>;

export const Link: FC<Props> = ({ children, href, ...other }) => {
    // Pass Any internal link to Next.js Link, for anything else, use <a> tag
    const internal = /^\/(?!\/)/.test(href);
    if (internal) {
        return (
            <NextLink href={href}>
                <a {...other}>{children}</a>
            </NextLink>
        );
    }

    return (
        <a href={href} {...other}>
            {children}
        </a>
    );
};
