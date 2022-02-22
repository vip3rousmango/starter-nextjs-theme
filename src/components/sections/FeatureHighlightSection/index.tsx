import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import { Badge } from '../../atoms/Badge';
import { DynamicComponent } from '../../DynamicComponent';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.FeatureHighlightSection;

export const FeatureHighlightSection: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const bgSize = props.backgroundSize ?? 'full';
    const sectionStyles = props.styles?.self ?? {};
    const sectionWidth = sectionStyles.width ?? 'wide';
    const sectionHeight = sectionStyles.height ?? 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent ?? 'center';
    const sectionFlexDirection = sectionStyles.flexDirection ?? 'row';
    const sectionAlignItems = sectionStyles.alignItems ?? 'center';
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-feature-highlight-section',
                bgSize === 'inset' ? 'flex' : null,
                bgSize === 'inset' ? mapStyles({ justifyContent: sectionJustifyContent }) : null,
                sectionStyles.margin
            )}
        >
            <div
                className={classNames(
                    colors,
                    'flex',
                    'flex-col',
                    'justify-center',
                    'relative',
                    bgSize === 'inset' ? 'w-full' : null,
                    bgSize === 'inset' ? mapMaxWidthStyles(sectionWidth) : null,
                    mapMinHeightStyles(sectionHeight),
                    sectionStyles.padding ?? 'py-12 px-4',
                    sectionStyles.borderColor,
                    sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
                    sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                    sectionStyles.boxShadow ? mapStyles({ boxShadow: sectionStyles.boxShadow }) : null
                )}
                style={{
                    borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : undefined
                }}
            >
                <div
                    className={classNames(
                        'relative',
                        'w-full',
                        bgSize === 'full' ? 'flex' : null,
                        bgSize === 'full' ? mapStyles({ justifyContent: sectionJustifyContent }) : null
                    )}
                >
                    <div className={classNames('w-full', bgSize === 'full' ? mapMaxWidthStyles(sectionWidth) : null)}>
                        <div
                            className={classNames(
                                'flex',
                                mapFlexDirectionStyles(sectionFlexDirection),
                                mapStyles({ alignItems: sectionAlignItems }),
                                'space-y-8',
                                {
                                    'space-y-reverse': sectionFlexDirection === 'col-reverse' || sectionFlexDirection === 'row-reverse',
                                    'lg:space-y-0': sectionFlexDirection === 'row' || sectionFlexDirection === 'row-reverse'
                                }
                            )}
                        >
                            <div className="flex-1 w-full">
                                <div
                                    className={classNames({
                                        'lg:pr-1/4': props.media && sectionFlexDirection === 'row',
                                        'lg:pl-1/4': props.media && sectionFlexDirection === 'row-reverse'
                                    })}
                                >
                                    <FeatureHighlightBody {...props} />
                                    <FeatureHighlightActions {...props} />
                                </div>
                            </div>
                            {props.media && (
                                <div className="flex-1 w-full">
                                    <DynamicComponent {...props.media} {...toFieldPath('.media')} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureHighlightBody: React.FC<types.FeatureHighlightSection> = (props) => {
    const styles = props.styles ?? {};
    return (
        <>
            {props.badge && <Badge {...props.badge} {...toFieldPath('.badge')} />}
            {props.title && (
                <h2
                    className={classNames(styles.title ? mapStyles(styles.title) : null, {
                        'mt-4': props.badge?.label
                    })}
                    {...toFieldPath('.title')}
                >
                    {props.title}
                </h2>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-xl', 'sm:text-2xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-4': props.title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {props.subtitle}
                </p>
            )}
            {props.text && (
                <Markdown
                    text={props.text}
                    className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, {
                        'mt-6': props.title || props.subtitle
                    })}
                    fieldName="text"
                />
            )}
        </>
    );
};

const FeatureHighlightActions: React.FC<types.FeatureHighlightSection> = (props) => {
    const actions = props.actions ?? [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles ?? {};
    return (
        <div
            className={classNames('overflow-x-hidden', {
                'mt-8': props.title || props.subtitle || props.text || props.badge
            })}
        >
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                {...toFieldPath('.actions')}
            >
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};

function mapMinHeightStyles(height: string) {
    switch (height) {
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width: string) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}

function mapFlexDirectionStyles(flexDirection: string) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
    }
    return null;
}
