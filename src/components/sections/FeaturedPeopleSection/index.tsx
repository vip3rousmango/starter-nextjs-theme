import * as React from 'react';
import classNames from 'classnames';
import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import { Markdown } from '../../atoms/Markdown';

export type Props = Omit<types.FeaturedPeopleSection, 'people'> & {
    people: types.Person[];
};

export const FeaturedPeopleSection: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const styles = props.styles ?? {};
    const sectionWidth = styles.self?.width ?? 'wide';
    const sectionHeight = styles.self?.height ?? 'auto';
    const sectionJustifyContent = styles.self?.justifyContent ?? 'center';
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-featured-people-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
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
                    {FeaturedPeopleVariants(props)}
                    {FeaturedPeopleActions(props)}
                </div>
            </div>
        </div>
    );
};

const FeaturedPeopleActions: React.FC<Props> = (props) => {
    const actions = props.actions ?? [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles ?? {};
    return (
        <div className="mt-12 overflow-x-hidden">
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                {...toFieldPath('.actions')}
            >
                {props.actions?.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};

const FeaturedPeopleVariants: React.FC<Props> = (props) => {
    const variant = props.variant ?? 'variant-a';
    switch (variant) {
        case 'variant-a':
            return PeopleVariantA(props);
        case 'variant-b':
            return PeopleVariantB(props);
        case 'variant-c':
            return PeopleVariantC(props);
    }
};

const PeopleVariantA: React.FC<Props> = (props) => {
    const people = props.people ?? [];
    if (people.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-6', 'sm:grid-cols-2', 'lg:grid-cols-4', 'lg:gap-8', {
                'mt-12': props.title || props.subtitle
            })}
            {...toFieldPath('.people')}
        >
            {people.map((person, index) => (
                <article key={index} {...toFieldPath(`.${index}`)}>
                    {person.image && (
                        <div className="relative w-full h-0 pt-1/1" {...toFieldPath('.image')}>
                            <ImageBlock {...person.image} className="absolute top-0 left-0 object-cover w-full h-full" />
                        </div>
                    )}
                    <div
                        className={classNames('mb-4', {
                            'pt-6': person.image
                        })}
                    >
                        {(person.firstName || person.lastName) && (
                            <h3>
                                {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                                {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}
                            </h3>
                        )}
                        {person.role && <p {...toFieldPath('.role')}>{person.role}</p>}
                    </div>
                </article>
            ))}
        </div>
    );
};

const PeopleVariantB: React.FC<Props> = (props) => {
    const people = props.people ?? [];
    if (people.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-8', 'gap-y-10', 'lg:grid-cols-2', {
                'mt-12': props.title || props.subtitle
            })}
            {...toFieldPath('.people')}
        >
            {people.map((person, index) => (
                <article key={index} className="sm:flex" {...toFieldPath(`.${index}`)}>
                    {person.image && (
                        <div className="w-full sm:flex-shrink-0 sm:h-full sm:w-1/3">
                            <div className="relative block w-full h-0 pt-1/1" {...toFieldPath('.image')}>
                                <ImageBlock {...person.image} className="absolute top-0 left-0 object-cover w-full h-full" />
                            </div>
                        </div>
                    )}
                    <div
                        className={classNames('mb-4', 'sm:flex-grow', {
                            'pt-6 sm:pt-0 sm:pl-6': person.image
                        })}
                    >
                        {(person.firstName || person.lastName) && (
                            <h3>
                                {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                                {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}
                            </h3>
                        )}
                        {person.role && <p {...toFieldPath('.role')}>{person.role}</p>}
                        {person.bio && (
                            <Markdown
                                text={person.bio}
                                className={classNames({
                                    'mt-4': person.firstName || person.lastName || person.role
                                })}
                                {...toFieldPath('.bio')}
                            />
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
};

const PeopleVariantC: React.FC<Props> = (props) => {
    const people = props.people ?? [];
    if (people.length === 0) {
        return null;
    }
    const middleIndex = Math.floor(people.length / 2);
    const peopleLeft = people.slice(0, middleIndex);
    const peopleRight = people.slice(middleIndex, people.length);
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'sm:grid-cols-2', {
                'mt-12': props.title || props.subtitle
            })}
            {...toFieldPath('.people')}
        >
            {peopleLeft.length > 0 && (
                <div className="sm:mt-32">
                    <PeopleListVariantC people={peopleLeft} />
                </div>
            )}
            {peopleRight.length > 0 && (
                <div>
                    <PeopleListVariantC people={peopleRight} annotIndexStart={middleIndex} />
                </div>
            )}
        </div>
    );
};

const PeopleListVariantC: React.FC<{ people: Props['people']; annotIndexStart?: number }> = ({ people, annotIndexStart = 0 }) => {
    return (
        <>
            {people.map((person, index, arr) => (
                <article key={index} className={classNames(arr.length - 1 === index ? null : 'mb-12')} {...toFieldPath(`.${annotIndexStart + index}`)}>
                    {person.image && (
                        <div {...toFieldPath('.image')}>
                            <ImageBlock {...person.image} className="w-full" />
                        </div>
                    )}
                    <div className={classNames({ 'mt-4': person.image })}>
                        {(person.firstName || person.lastName || person.role) && (
                            <h3 className={classNames({ 'mb-3': person.bio })}>
                                {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                                {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}{' '}
                                {(person.firstName || person.lastName) && person.role && <span className="mx-1">|</span>}{' '}
                                {person.role && <span {...toFieldPath('.role')}>{person.role}</span>}
                            </h3>
                        )}
                        {person.bio && <Markdown text={person.bio} className="sb-markdown" {...toFieldPath('.bio')} />}
                    </div>
                </article>
            ))}
            ;
        </>
    );
};

function mapMinHeightStyles(height: string) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
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
