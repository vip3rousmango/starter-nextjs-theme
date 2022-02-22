import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.JobsSection;

export const JobsSection: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const styles = props.styles ?? {};
    const sectionWidth = styles.self?.width ?? 'wide';
    const sectionHeight = styles.self?.height ?? 'auto';
    const sectionJustifyContent = styles.self?.justifyContent ?? 'center';
    const jobLists = props.jobLists ?? [];
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-jobs-section',
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
                    {jobLists.length > 0 && (
                        <div
                            className={classNames('space-y-16 lg:space-y-24', {
                                'mt-12 lg:mt-16': props.title || props.subtitle
                            })}
                            {...toFieldPath('.jobLists')}
                        >
                            {jobLists.map((jobList, index) => (
                                <JobList key={index} {...jobList} {...toFieldPath(`.${index}`)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const JobList: React.FC<types.JobList & StackbitFieldPath> = (props) => {
    const jobItems = props.items ?? [];
    return (
        <div className="pb-12 border-b border-current lg:pb-20" {...pickDataAttrs(props)}>
            {props.title && (
                <h3 className="mb-10" {...toFieldPath('.title')}>
                    {props.title}
                </h3>
            )}
            {jobItems.length > 0 && (
                <div className="space-y-16 lg:space-y-24" {...toFieldPath('.items')}>
                    {jobItems.map((jobItem, index) => (
                        <JobListItem key={index} {...jobItem} {...toFieldPath(`.${index}`)} />
                    ))}
                </div>
            )}
        </div>
    );
};

const JobListItem: React.FC<types.JobListItem & StackbitFieldPath> = (props) => {
    const actions = props.actions ?? [];
    return (
        <div className="max-w-screen-sm" {...pickDataAttrs(props)}>
            {props.title && (
                <h4 className="text-xl font-normal" {...toFieldPath('.title')}>
                    {props.title}
                </h4>
            )}
            {props.location && (
                <p className={classNames('text-xl', 'font-bold', { 'mt-4': props.title })} {...toFieldPath('.location')}>
                    {props.location}
                </p>
            )}
            {props.text && (
                <Markdown
                    text={props.text}
                    className={classNames('sb-markdown', {
                        'mt-10 lg:mt-12': props.title || props.location
                    })}
                    fieldName="text"
                />
            )}
            {actions.length > 0 && (
                <div
                    className={classNames('overflow-x-hidden', {
                        'mt-10 lg:mt-12': props.title || props.location || props.text
                    })}
                >
                    <div className="flex flex-wrap items-center -mx-2" {...toFieldPath('.actions')}>
                        {actions.map((action, index) => (
                            <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                </div>
            )}
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
