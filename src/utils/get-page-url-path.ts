import type * as types from '.contentlayer/types';

export const getPageUrlPath = (page: types.PostLayout | types.PageLayout | any) => {
    if (page._raw?.flattenedPath) {
        return page._raw.flattenedPath.replace(/^pages/, '');
    }

    const filePath = page.__metadata?.relSourcePath ?? '';
    const parts = filePath.split('/').filter(Boolean);
    const extensionsRe = /\.(?:mdx?|json|ya?ml|toml)$/;
    if (parts[parts.length - 1]) {
        parts[parts.length - 1] = parts[parts.length - 1].replace(extensionsRe, '');
        if (parts[parts.length - 1] === 'index') {
            parts.pop();
        }
    }
    return '/' + parts.join('/').toLowerCase();
};
