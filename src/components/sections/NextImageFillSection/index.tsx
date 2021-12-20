import * as React from 'react';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import { getDataAttrs } from '../../../utils/get-data-attrs';

export default function NextImageFillSection(props) {
    const cssId = props.elementId || null;
    const aspectRatio = props.aspectRatio || '4:3';
    return (
        <div id={cssId} {...getDataAttrs(props)} className="sb-component sb-component-section colors-a flex flex-col justify-center py-12 px-4">
            <div className="flex w-full justify-center">
                <div className="w-full max-w-screen-xl">
                    <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
                        <div className="flex-1 w-full">
                            {props.title && <h2 className="h1" data-sb-field-path=".title">{props.title}</h2>}
                            {props.text && (
                                <Markdown
                                    options={{ forceBlock: true, forceWrapper: true }}
                                    className="sb-markdown sm:text-lg mt-8"
                                    data-sb-field-path=".text"
                                >
                                    {props.text}
                                </Markdown>
                            )}
                        </div>
                        {props.url && (
                            <div className="flex-1 w-full relative">
                                <div
                                    className={classNames(
                                        'h-0',
                                        'w-full',
                                        {
                                            'pt-1/1': aspectRatio === '1:1',
                                            'pt-3/2': aspectRatio === '2:3',
                                            'pt-2/3': aspectRatio === '3:2',
                                            'pt-4/3': aspectRatio === '3:4',
                                            'pt-3/4': aspectRatio === '4:3',
                                            'pt-9/16': aspectRatio === '16:9',
                                            'pt-16/9': aspectRatio === '9:16'
                                        }
                                    )}
                                >
                                    <Image
                                        src={props.url}
                                        alt={props.alt || ''}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
