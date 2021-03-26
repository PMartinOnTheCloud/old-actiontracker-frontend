
import {IStorage} from './IStorage';
import {IStorageConfig} from './IStorageConfig';


export class BrowserStorage implements IStorage {

    public readonly instance: Storage;

    public constructor(config: IStorageConfig) {
        this.instance = config.context === 'local' ? localStorage : sessionStorage;
    }

    public set<T>(key: string, value: T): void {
        this.instance.setItem(key, JSON.stringify(value));
    }

    public get<T>(key: string, defaultValue?: T): T | undefined {
        try {

            let value = JSON.parse(this.instance.getItem(key)) || defaultValue;

            if(value) {
                return value;
            }

        } catch(err) {
            console.error(err);
        }
    }

    public contains(key: string): boolean {
        let value = this.get(key);

        return !!value;
    }

    public delete(key: string): boolean {
        try {
            this.instance.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    public clear(): void {
        this.instance.clear();
    }

}
