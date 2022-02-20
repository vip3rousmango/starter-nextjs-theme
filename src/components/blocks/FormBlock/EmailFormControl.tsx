import * as React from 'react';
import classNames from 'classnames';
import type * as types from 'types';

import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '../../../utils/annotations';

export type Props = types.EmailFormControl & StackbitFieldPath;

export const EmailFormControl: React.FC<Props> = (props) => {
    const width = props.width ?? 'full';
    const labelId = `${props.name}-label`;
    const attr: React.InputHTMLAttributes<HTMLInputElement> = {};
    if (props.label) {
        attr['aria-labelledby'] = labelId;
    }
    if (props.isRequired) {
        attr.required = true;
    }
    return (
        <div
            className={classNames('sb-form-control', {
                'sm:col-span-2': width === 'full'
            })}
            {...pickDataAttrs(props)}
        >
            {props.label && (
                <label
                    id={labelId}
                    className={classNames('sb-label', { 'sr-only': props.hideLabel })}
                    htmlFor={props.name}
                    {...toFieldPath('.label', '.name#@for')}
                >
                    {props.label}
                </label>
            )}
            <input
                id={props.name}
                className="sb-input"
                type="email"
                name={props.name}
                {...(props.placeholder ? { placeholder: props.placeholder } : null)}
                {...attr}
                {...toFieldPath('.name#@id', '.name#@name', '.placeholder#@placeholder')}
            />
        </div>
    );
};