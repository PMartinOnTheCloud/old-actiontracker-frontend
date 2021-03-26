
import {Component, Input} from '@angular/core';
import {ValidatorFn} from '@angular/forms';

import {CustomValidators, ValidationProperty, ValidationSchema} from '../../models/validators';
import {DisplayConfig} from '../../models/entities';


@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent<T> {

    @Input() public schema: ValidationSchema;
    @Input() public item: T;
    @Input() public displayConfig: DisplayConfig;

    public getValidators(property: ValidationProperty): ValidatorFn[] {

        let validators = property.validators || [];

        return Object.keys(validators).map(key => {
            if(!validators[key]) {
                return CustomValidators[key];
            }
            return CustomValidators[key](...validators[key])
        });

    }

    public isValidatorInput(type: string): string {
        if(type === 'string' || type === 'number') {
            return type;
        }
        return null;
    }

    public getInputType(type: string): string {
        return type === 'string' ? 'text' : type;
    }

    public getFlexConfValue(index: number): string {
        let flex = this.displayConfig && this.displayConfig.flex;

        if (!flex || index >= flex.length)
            return '1 1 auto';
        else {
            let val = flex[index];
            return `${val} ${val} auto`;
        }
    }
}
