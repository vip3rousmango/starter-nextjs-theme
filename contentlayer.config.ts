import { makeSource } from 'contentlayer/source-files';
import * as documentTypes from './src/contentlayer';
import { contentDirPath } from './src/utils/stackbit';

export default makeSource({
    contentDirPath,
    documentTypes,
    // skip `data/style.json`
    onUnknownDocuments: 'skip-ignore'
});
