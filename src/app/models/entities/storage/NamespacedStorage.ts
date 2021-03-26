
import {IStorage} from './IStorage';


export class NamespacedStorage implements IStorage {

    private namespace: string;
    private storage: IStorage;

    public readonly instance: Storage;

    public constructor(namespace: string, storage: IStorage) {
        this.namespace = namespace;
        this.storage = storage;
        this.instance = storage.instance;
    }

    public set<T>(key: string, value: T): void {
        this.storage.set(this.formatNamespace(key),value);
    }

    public get<T>(key: string, defaultValue?: T): T | undefined {
        return this.storage.get(this.formatNamespace(key), defaultValue);
    }

    public contains(key: string): boolean {
        return this.storage.contains(this.formatNamespace(key));
    }

    public delete(key: string): boolean {
        return this.storage.delete(this.formatNamespace(key));
    }

    public clear(): void {

        for(let i = 0; i < this.instance.length; i++) {
            let key = this.instance.key(i);

            if(key.startsWith(this.formatNamespace('')))
                this.delete(key.substr(key.indexOf(':') + 1));
        }

    }

    private formatNamespace(key: string) {
        return `#${this.namespace}:${key}`;
    }
}
