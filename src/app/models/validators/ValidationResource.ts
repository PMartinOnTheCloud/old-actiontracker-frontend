
import {ValidationSchema} from './schemas';
import {DisplayConfig} from '../entities';


export interface ValidationResource<T> {

    schema: ValidationSchema;

    displayConfig: DisplayConfig;

    item: T;

    //TODO: check if there is a better way
    titleKey: string;

    create: boolean;

}
