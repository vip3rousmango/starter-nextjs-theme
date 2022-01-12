import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const VideoBlock = defineNestedType(() => ({
  name: 'VideoBlock',
  fields: {
    title: { type: 'string' },
    url: { type: 'string' },
    autoplay: { type: 'boolean', default: false },
    loop: { type: 'boolean', default: false },
    muted: { type: 'boolean', default: false },
    controls: { type: 'boolean', default: true },
    aspectRatio: { type: 'enum', options: ['4:3', '16:9'], default: '16:9' },
    elementId
  }
}));
