import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.FeaturedItem & StackbitFieldPath;

export const FeaturedItem: React.FC<Props> = (props) => {
    const styles = props.styles ?? {};
    const itemBorderWidth = styles.self?.borderWidth ? styles.self?.borderWidth : 0;
    return (
        <article
            id={props.elementId}
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-item',
                props.enableHover ? 'sb-component-item-hover' : null,
                styles.self?.padding,
                styles.self?.borderColor,
                styles.self?.borderStyle ? mapStyles({ borderStyle: styles.self?.borderStyle }) : 'border-none',
                styles.self?.borderRadius ? mapStyles({ borderRadius: styles.self?.borderRadius }) : null,
                styles.self?.textAlign ? mapStyles({ textAlign: styles.self?.textAlign }) : null
            )}
            style={{
                borderWidth: itemBorderWidth ? `${itemBorderWidth}px` : undefined
            }}
            {...pickDataAttrs(props)}
        >
            {props.featuredImage && (
                <div className="mb-6" {...toFieldPath('.featuredImage')}>
                    <ImageBlock {...props.featuredImage} className="inline-block" />
                </div>
            )}
            {props.title && (
                <h3 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {props.title}
                </h3>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-lg', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-1': props.title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {props.subtitle}
                </p>
            )}
            {props.text && (
                <Markdown
                    text={props.text}
                    {...toFieldPath('.text')}
                    className={classNames('sb-markdown', {
                        'mt-4': props.title || props.subtitle
                    })}
                />
            )}
            <ItemActions {...props} />
        </article>
    );
};

const ItemActions: React.FC<Props> = (props) => {
    const actions = props.actions ?? [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles ?? {};
    return (
        <div
            className={classNames('overflow-x-hidden', {
                'mt-6': props.title || props.subtitle || props.text
            })}
        >
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', {
                    'justify-center': styles.self?.textAlign === 'center',
                    'justify-end': styles.self?.textAlign === 'right'
                })}
                {...toFieldPath('.actions')}
            >
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};
