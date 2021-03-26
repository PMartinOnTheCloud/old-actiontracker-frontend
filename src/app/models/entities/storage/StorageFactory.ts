
import {AssignableObject} from '../../AssignableObject';
import {IStorage} from './IStorage';
import {NamespacedStorage} from './NamespacedStorage';
import {BrowserStorage} from './BrowserStorage';


export class StorageFactory {

    private static instances: AssignableObject<IStorage> = {};

    public static get(context: StorageContext = 'local'): IStorage {
        let instance = this.instances[context];

        if(!instance) {
            instance = this.instances[context] = new NamespacedStorage(
                'atm',
                new BrowserStorage({context})
            );
        }

        return instance;
    }

}
