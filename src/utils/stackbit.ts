export const contentDirPath = 'content';

export const objectIdDataAttr = (page: { _id: string }) => ({ 'data-sb-object-id': `${contentDirPath}/${page._id}` });

export type StackbitFieldPath = { 'data-sb-field-path': string };
