declare module 'sourcebit-target-next' {
    export type SourcebitDataClient = {
        getData: () => Promise<{ pages: any[]; objects: any[] }>;
    };

    const sourcebitDataClient: SourcebitDataClient;
}

declare module 'sourcebit-target-next/with-remote-data-updates' {
    import { ComponentType } from 'React';
    const withRemoteDataUpdates: <T, P extends ComponentType<P>>(component: T) => T;
}
