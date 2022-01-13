import { FC } from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

export type Props = { text: string; className?: string; fieldName: string };

export const Markdown: FC<Props> = ({ text, className, fieldName }) => {
    return (
        <MarkdownToJsx
            options={{ forceBlock: true, forceWrapper: true }}
            className={className}
            data-sb-field-path={`.${fieldName}`}
        >
            {text}
        </MarkdownToJsx>
    );
};
