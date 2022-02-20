export const StackbitObjectIdAttrName = 'data-sb-object-id';
export const StackbitFieldPathAttrName = 'data-sb-field-path';

export type StackbitObjectId = { [StackbitObjectIdAttrName]?: string };
export type StackbitFieldPath = { [StackbitFieldPathAttrName]?: string };

export type StackbitAnnotations = StackbitObjectId & StackbitFieldPath;

export function getObjectId(props?: StackbitObjectId): string | undefined {
    return props?.[StackbitObjectIdAttrName];
}

export function getFieldPath(props?: StackbitFieldPath): string | undefined {
    return props?.[StackbitFieldPathAttrName];
}

export function toObjectId(objectId?: string): StackbitObjectId {
    if (process.env.NODE_ENV === 'production') {
        return {};
    }
    if (!objectId) {
        return {};
    }
    return { [StackbitObjectIdAttrName]: objectId };
}

export type FieldPathDescriptor = ({ fieldPath: string } | { fp: string }) & ({ objectId?: string } | { oid?: string }) & { xpath?: string };

export function toFieldPath(...fieldPaths: (undefined | null | string | FieldPathDescriptor)[]): StackbitFieldPath {
    if (process.env.NODE_ENV === 'production') {
        return {};
    }
    const fieldPath = fieldPaths
        .map((fieldPath) => {
            if (!fieldPath) {
                return null;
            }
            if (typeof fieldPath === 'string') {
                return fieldPath;
            }
            const fp = 'fieldPath' in fieldPath ? fieldPath.fieldPath : fieldPath.fp;
            const oid = 'objectId' in fieldPath ? fieldPath.objectId : 'oid' in fieldPath ? fieldPath.oid : '';
            const xpath = 'xpath' in fieldPath ? fieldPath.xpath : '';
            return (oid ? `${oid}:` : '') + fp + (xpath ? `#${xpath}` : '');
        })
        .filter(Boolean)
        .join(' ')
        .trim();
    return fieldPath ? { [StackbitFieldPathAttrName]: fieldPath } : {};
}

export function pickDataAttrs(props: Record<string, any> = {}): Record<string, any> {
    return Object.entries(props).reduce((dataAttrs: Record<string, any>, [key, value]) => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = value;
        }
        return dataAttrs;
    }, {});
}
