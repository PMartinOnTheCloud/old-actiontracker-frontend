
import {ValidationSchema} from '../validators/schemas';
import {AssignableObject} from '../AssignableObject';
import {DisplayConfig} from './DisplayConfig';


export interface EntityInfo {
    routes: AssignableObject<string>;
    schema: ValidationSchema;
    displayConfig?: DisplayConfig;
}
