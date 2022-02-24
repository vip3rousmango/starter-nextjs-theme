import * as React from 'react';
import classNames from 'classnames';
import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { DynamicComponent } from '../../DynamicComponent';
import { usePlaceholders } from '../../../utils/usePlaceholders';

export type Props = {
    type: 'GridSection';
    title?: string;
    gridItems?: (types.FormBlock | types.ImageBlock | types.VideoBlock | PlaceholderItem)[];
};

export type PlaceholderItem = {
    type: 'PlaceholderItem';
};

export const GridSection: React.FC<Props> = (props) => {
    const gridItems = (props.gridItems ?? []).slice();

    const showPlaceholders = usePlaceholders();

    return (
        <div {...pickDataAttrs(props)} className={classNames('sb-component', 'sb-component-section', 'max-w-screen-xl', 'm-auto', 'pt-4')}>
            <h3 className="mb-4 text-center" {...toFieldPath('.title')}>{props.title}</h3>
            <div className={classNames('grid grid-cols-3 gap-4 auto-rows-fr items-center')} {...toFieldPath('.gridItems')}>
                {(gridItems ?? []).map((gridItem, index) => {
                    if (gridItem.type === 'PlaceholderItem') {
                        return showPlaceholders ? (
                            <div key={index} {...toFieldPath(`.${index}`)} className="h-full text-6xl text-gray-600 bg-gray-300 flex items-center justify-center">
                                +
                            </div>
                        ) : null;
                    } else {
                        return <DynamicComponent key={index} {...gridItem} {...toFieldPath(`.${index}`)} />;
                    }
                })}
            </div>
        </div>
    );
};
