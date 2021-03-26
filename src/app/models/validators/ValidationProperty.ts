
import {AssignableObject} from '../AssignableObject';


export interface ValidationProperty {

    type: Function,

    validators?: AssignableObject<string[] | number[]>,

    required?: boolean;

}
