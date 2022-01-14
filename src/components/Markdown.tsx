import { FC } from 'react';
import type * as types from '.contentlayer/types';

export type Props = { text: types.Markdown; className?: string; fieldName: string };

export const Markdown: FC<Props> = ({ text, className, fieldName }) => {
    return <div dangerouslySetInnerHTML={{ __html: text.html }} className={className} data-sb-field-path={`.${fieldName}`} />;
};
