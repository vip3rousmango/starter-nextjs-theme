import * as React from 'react';
import classNames from 'classnames';
import { FC } from 'react';
import type * as types from '.contentlayer/types';
import { StackbitFieldPath } from '../../../utils/stackbit';

export type Props = types.CheckboxFormControl & StackbitFieldPath;

export const CheckboxFormControl: FC<Props> = (props) => {
    const width = props.width ?? 'full';
    const labelId = `${props.name}-label`;
    const attr: any = {};
    if (props.label) {
        attr['aria-labelledby'] = labelId;
    }
    if (props.isRequired) {
        attr.required = true;
    }
    return (
        <div
            className={classNames('sb-form-control', 'flex', 'items-center', {
                'sm:col-span-2': width === 'full'
            })}
            data-sb-field-path={props['data-sb-field-path']}
        >
            <input
                id={props.name}
                className="sb-checkbox"
                type="checkbox"
                name={props.name}
                {...attr}
                data-sb-field-path=".name#@id .name#@name"
            />
            {props.label && (
                <label id={labelId} className="sb-label" htmlFor={props.name} data-sb-field-path=".label .name#@for">
                    {props.label}
                </label>
            )}
        </div>
    );
};
