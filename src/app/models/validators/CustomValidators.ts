
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export class CustomValidators {

    public static range(from: number, to: number): ValidatorFn {

        return function(c: AbstractControl): ValidationErrors {

            let {value} = c;

            let asNumber = value && parseInt(value);

            let isNumber = !isNaN(asNumber) && asNumber.toString().length === value.toString().length;

            //Check if is number (maybe this is not necessary in a future)
            let error = isNumber
                ? `The number should be in range ${from} - ${to} (${value} found)`
                : 'Should be a number';

            return !value || value >= from && value <= to ? null : {range: error}
        }

    }

    public static textLimit(length: number): ValidatorFn {

        return function(c: AbstractControl): ValidationErrors {

            let {value} = c;
            let l = value && value.toString().length;

            return !l || l <= length ? null : {textLimit: `Maximum length is ${length} (${l} found)`};
        }

    }

    public static email(c: AbstractControl): ValidationErrors {

        let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegexp.test(c.value) ? null : {email: 'Invalid Email'};

    }

}
