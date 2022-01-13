declare module 'sourcebit-target-next' {
    export type SourcebitDataClient = {
        getData: () => Promise<{ pages: any[]; objects: any[] }>;
    };

    const sourcebitDataClient: SourcebitDataClient;
}
