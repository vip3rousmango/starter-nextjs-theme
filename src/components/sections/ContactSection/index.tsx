import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { FormBlock } from '../../blocks/FormBlock';
import { DynamicComponent } from '../../DynamicComponent';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.ContactSection;

export const ContactSection: React.FC<Props> = (props) => {
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
                'sb-component-contact-section',
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
                                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                                    'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                                    'space-y-reverse': sectionFlexDirection === 'col-reverse'
                                }
                            )}
                        >
                            <div className="flex-1 w-full">
                                {ContactBody(props)}
                                {props.form && (
                                    <div
                                        className={classNames('sb-contact-section-form', {
                                            'mt-12': props.title || props.text
                                        })}
                                    >
                                        <FormBlock {...props.form} className="inline-block w-full max-w-screen-sm" {...toFieldPath('.form')} />
                                    </div>
                                )}
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

const ContactBody: React.FC<Props> = (props) => {
    const styles = props.styles ?? {};
    return (
        <>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {props.title}
                </h2>
            )}
            {props.text && (
                <Markdown
                    text={props.text}
                    className={classNames('sb-markdown', styles.text ? mapStyles(styles.text) : null, {
                        'mt-4': props.title
                    })}
                    {...toFieldPath('.text')}
                />
            )}
        </>
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
