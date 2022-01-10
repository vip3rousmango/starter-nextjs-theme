import { defineNestedType } from 'contentlayer/source-files';
import { elementId } from '../common';

export const VideoBlock = defineNestedType(() => ({
  name: 'VideoBlock',
  fields: {
    elementId
  }
}));
