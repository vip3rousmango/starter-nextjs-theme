import * as React from 'react';
import classNames from 'classnames';
import { StackbitFieldPath, toFieldPath, getFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { Link } from './Link';
import { iconMap } from '../svgs';

export type Props = types.Social & { className?: string } & StackbitFieldPath;

export const Social: React.FC<Props> = (props) => {
    const { elementId, className, label, altText, url } = props;
    const icon = props.icon ?? 'facebook';
    const IconComponent = iconMap[icon];
    const annotationPrefix = getFieldPath(props);
    const annotations = annotationPrefix
        ? [`${annotationPrefix}`, `${annotationPrefix}.url#@href`, `${annotationPrefix}.altText#@aria-label`, `${annotationPrefix}.elementId#@id`]
        : [];
    const style = props.style ?? 'link';

    return (
        <Link
            href={url}
            aria-label={altText}
            id={elementId}
            className={classNames('sb-component', 'sb-component-block', 'sb-component-social', className, {
                'sb-component-social-primary': style === 'primary',
                'sb-component-social-secondary': style === 'secondary'
            })}
            {...toFieldPath(...annotations)}
        >
            {label && (
                <span className="sr-only" {...toFieldPath('.label')}>
                    {label}
                </span>
            )}
            {IconComponent && <IconComponent className="w-5 h-5 fill-current" {...toFieldPath('.icon')} />}
        </Link>
    );
};
