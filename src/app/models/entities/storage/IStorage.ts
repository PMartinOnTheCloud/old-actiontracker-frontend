

export interface IStorage {

    readonly instance: Storage;

    set<T>(key: string, value: T): void;

    get<T>(key: string, defaultValue?: T): T | undefined;

    contains(key: string): boolean;

    delete(key: string): boolean;

    clear(): void;

}
