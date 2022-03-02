import { FC } from 'react';
import { pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = { text: types.Markdown; className?: string } & StackbitFieldPath;

export const Markdown: FC<Props> = ({ text, className, ...rest }) => {
    return <div dangerouslySetInnerHTML={{ __html: text.html }} className={className} {...pickDataAttrs(rest)} />;
};
