import * as React from 'react';
import classNames from 'classnames';
import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';

import { usePlaceholders } from '../../utils/usePlaceholders';

export type Props = {
    type: 'PlaceholderSection';
};


export const PlaceholderSection: React.FC<Props> = (props) => {
    const showPlaceholders = usePlaceholders();

    if (!showPlaceholders) {
        return null;
    }

    return (
        <div {...pickDataAttrs(props)} className={classNames('my-8', 'sb-component', 'sb-component-section', 'max-w-screen-xl', 'm-auto', 'text-6xl text-gray-600 bg-gray-300 flex items-center justify-center')}>
            <h3 className="py-8 text-center" {...toFieldPath('.title')}>+</h3>
        </div>
    );
};
