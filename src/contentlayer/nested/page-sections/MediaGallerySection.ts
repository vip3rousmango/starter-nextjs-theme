import { defineNestedType } from 'contentlayer/source-files';
import { colors, elementId } from '../../common';
import { ImageBlock } from '../ImageBlock';
import { Styles } from '../Styles';

export const MediaGallerySection = defineNestedType(() => ({
  name: 'MediaGallerySection',
  fields: {
    elementId,
    colors,
    title: { type: 'string', default: 'This Is A Big Hero Headline' },
    subtitle: { type: 'string', default: 'The section subtitle' },
    images: { type: 'list', of: ImageBlock },
    spacing: { type: 'number', default: 1 },
    columns: { type: 'number', default: 4 },
    aspectRatio: { type: 'enum', options: ['1:1', '3:2', '2:3', '4:3', '3:4', '16:9', 'auto'], default: '1:1' },
    imageSizePx: { type: 'number', default: 300 },
    showCaption: { type: 'boolean', default: true },
    enableHover: { type: 'boolean', default: true },
    styles: {
      type: 'nested',
      of: Styles,
      default: {}
    }
  }
}));
