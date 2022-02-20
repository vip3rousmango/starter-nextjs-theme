import * as React from 'react';
import classNames from 'classnames';
import type * as types from 'types';

import { Link } from './Link';
import { iconMap } from '../svgs';
import { toFieldPath, getFieldPath, StackbitFieldPath } from '../../utils/annotations';

export type Props = (types.Link | types.Button) & StackbitFieldPath & { className?: string };

export const Action: React.FC<Props> = (props) => {
    const { elementId, className, type, label, altText, url, showIcon } = props;
    const icon = props.icon ?? 'arrowLeft';
    const iconPosition = props.iconPosition ?? 'right';
    const IconComponent = iconMap[icon];
    const annotationPrefix = getFieldPath(props);
    const annotations = annotationPrefix
        ? [`${annotationPrefix}`, `${annotationPrefix}.url#@href`, `${annotationPrefix}.altText#@aria-label`, `${annotationPrefix}.elementId#@id`]
        : [];
    const defaultStyle = type === 'Link' ? 'link' : 'secondary';
    const style = type === 'Button' ? props.style ?? defaultStyle : defaultStyle;

    return (
        <Link
            href={url}
            aria-label={altText}
            id={elementId}
            className={classNames('sb-component', 'sb-component-block', style === 'link' ? 'sb-component-link' : 'sb-component-button', className, {
                'sb-component-button-primary': style === 'primary',
                'sb-component-button-secondary': style === 'secondary'
            })}
            {...toFieldPath(...annotations)}
        >
            {label && <span {...toFieldPath('.label')}>{label}</span>}
            {showIcon && IconComponent && (
                <IconComponent
                    {...toFieldPath('.icon')}
                    className={classNames('fill-current h-5 w-5', {
                        'order-first': iconPosition === 'left',
                        'mr-1.5': label && iconPosition === 'left',
                        'ml-1.5': label && iconPosition === 'right'
                    })}
                />
            )}
        </Link>
    );
};
