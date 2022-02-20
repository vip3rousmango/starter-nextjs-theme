import * as React from 'react';
import classNames from 'classnames';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { ImageBlock } from '../blocks/ImageBlock';
import { Markdown } from '../Markdown';
import { toFieldPath, pickDataAttrs } from '../../utils/annotations';

export type Props = types.TestimonialsSection;

export const TestimonialsSection: React.FC<Props> = (props) => {
    const variant = props.variant ?? 'variant-a';
    const colors = props.colors ?? 'colors-a';
    const styles = props.styles ?? {};
    const sectionWidth = styles.self?.width ?? 'wide';
    const sectionHeight = styles.self?.height ?? 'auto';
    const sectionJustifyContent = styles.self?.justifyContent ?? 'center';
    const testimonials = props.testimonials ?? [];
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-testimonials-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                mapMinHeightStyles(sectionHeight),
                styles.self?.margin,
                styles.self?.padding ?? 'py-12 px-4',
                styles.self?.borderColor,
                styles.self?.borderStyle ? mapStyles({ borderStyle: styles.self?.borderStyle }) : 'border-none',
                styles.self?.borderRadius ? mapStyles({ borderRadius: styles.self?.borderRadius }) : null
            )}
            style={{
                borderWidth: styles.self?.borderWidth
            }}
        >
            <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                    {props.title && (
                        <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                            {props.title}
                        </h2>
                    )}
                    {props.subtitle && (
                        <p
                            className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                                'mt-6': props.title
                            })}
                            {...toFieldPath('.subtitle')}
                        >
                            {props.subtitle}
                        </p>
                    )}
                    {testimonials.length > 0 && (
                        <div className={classNames('space-y-12', { 'mt-12': props.title || props.subtitle })} {...toFieldPath('.testimonials')}>
                            {testimonials.map((testimonial, index) => {
                                switch (variant) {
                                    case 'variant-a':
                                        return <TestimonialVariantA key={index} index={index} {...testimonial} />;
                                    case 'variant-b':
                                        return <TestimonialVariantB key={index} index={index} {...testimonial} />;
                                    case 'variant-c':
                                        return <TestimonialVariantC key={index} index={index} {...testimonial} />;
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TestimonialVariantA: React.FC<types.Testimonial & { index: number }> = ({ index, ...testimonial }) => {
    const styles = testimonial.styles ?? ({} as types.Styles);
    return (
        <blockquote key={index} className="flex flex-col md:items-center md:flex-row" {...toFieldPath(`.${index}`)}>
            {testimonial.image && (
                <div className="flex-shrink-0 max-w-lg mb-8 md:mb-0 md:mr-8 md:w-2/5" {...toFieldPath('.image')}>
                    <ImageBlock {...testimonial.image} className="w-full rounded-2xl" />
                </div>
            )}
            <div className="flex-grow">
                {testimonial.quote && (
                    <Markdown
                        text={testimonial.quote}
                        className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                        fieldName="quote"
                    />
                )}
                {(testimonial.name || testimonial.title) && (
                    <footer className="mt-8 md:mt-12">
                        {testimonial.name && (
                            <div className={classNames('text-xl', 'sm:text-2xl', styles.name ? mapStyles(styles.name) : null)} {...toFieldPath('.name')}>
                                {testimonial.name}
                            </div>
                        )}
                        {testimonial.title && (
                            <div
                                className={classNames(styles.title ? mapStyles(styles.title) : null, {
                                    'mt-2': testimonial.name
                                })}
                                {...toFieldPath('.title')}
                            >
                                {testimonial.title}
                            </div>
                        )}
                    </footer>
                )}
            </div>
        </blockquote>
    );
};

const TestimonialVariantB: React.FC<types.Testimonial & { index: number }> = ({ index, ...testimonial }) => {
    const styles = testimonial.styles ?? ({} as types.Styles);
    return (
        <blockquote key={index} {...toFieldPath(`.${index}`)}>
            {testimonial.quote && (
                <Markdown
                    text={testimonial.quote}
                    className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                    fieldName="quote"
                />
            )}
            {(testimonial.name || testimonial.title || testimonial.image) && (
                <footer className="flex items-center mt-12 md:mt-16">
                    {testimonial.image && (
                        <div className="flex-shrink-0 w-20 mr-8 sm:w-28" {...toFieldPath('.image')}>
                            <ImageBlock {...testimonial.image} className="w-full" />
                        </div>
                    )}
                    {(testimonial.name || testimonial.title) && (
                        <div className="flex-grow">
                            {testimonial.name && (
                                <div className={classNames('text-xl', 'sm:text-2xl', styles.name ? mapStyles(styles.name) : null)} {...toFieldPath('.name')}>
                                    {testimonial.name}
                                </div>
                            )}
                            {testimonial.title && (
                                <div
                                    className={classNames(styles.title ? mapStyles(styles.title) : null, {
                                        'mt-2': testimonial.name
                                    })}
                                    {...toFieldPath('.title')}
                                >
                                    {testimonial.title}
                                </div>
                            )}
                        </div>
                    )}
                </footer>
            )}
        </blockquote>
    );
};

const TestimonialVariantC: React.FC<types.Testimonial & { index: number }> = ({ index, ...testimonial }) => {
    const styles = testimonial.styles ?? ({} as types.Styles);
    return (
        <blockquote key={index} className="text-center" {...toFieldPath(`.${index}`)}>
            {testimonial.quote && (
                <Markdown
                    text={testimonial.quote}
                    className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                    fieldName="quote"
                />
            )}
            {(testimonial.name || testimonial.title || testimonial.image) && (
                <footer className="mt-12 md:mt-16">
                    {testimonial.image && (
                        <div
                            className={classNames('mx-auto', 'w-20', 'sm:w-28', {
                                'mb-6': testimonial.name || testimonial.title
                            })}
                            {...toFieldPath('.image')}
                        >
                            <ImageBlock {...testimonial.image} className="w-full" />
                        </div>
                    )}
                    {testimonial.name && (
                        <div className={classNames('text-xl', 'sm:text-2xl', styles.name ? mapStyles(styles.name) : null)} {...toFieldPath('.name')}>
                            {testimonial.name}
                        </div>
                    )}
                    {testimonial.title && (
                        <div
                            className={classNames(styles.title ? mapStyles(styles.title) : null, {
                                'mt-2': testimonial.name
                            })}
                            {...toFieldPath('.title')}
                        >
                            {testimonial.title}
                        </div>
                    )}
                </footer>
            )}
        </blockquote>
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
