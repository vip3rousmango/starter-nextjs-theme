import * as React from 'react';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import { getDataAttrs } from '../../../utils/get-data-attrs';

export default function NextImageResponsiveSection(props) {
    const cssId = props.elementId || null;
    return (
        <div id={cssId} {...getDataAttrs(props)} className="sb-component sb-component-section colors-a flex flex-col justify-center mb-12 py-12 px-4">
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
                                <Image
                                    src={props.url}
                                    alt={props.alt || ''}
                                    width="640"
                                    height="430"
                                    layout="responsive"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
