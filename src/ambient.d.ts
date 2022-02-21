declare module 'sourcebit-target-next' {
    import * as types from 'types';
    export type SourcebitDataClient = {
        getData: () => Promise<{ pages: any[]; objects: types.DocumentTypes[] }>;
    };

    const sourcebitDataClient: SourcebitDataClient;
}

declare module 'sourcebit-target-next/with-remote-data-updates' {
    import { ComponentType } from 'React';
    const withRemoteDataUpdates: <T, P extends ComponentType<P>>(component: T) => T;
}
