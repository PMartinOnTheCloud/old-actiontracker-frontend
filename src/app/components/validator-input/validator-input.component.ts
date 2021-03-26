
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import {InstantMatcher} from '../../models/matchers';
import {CustomValidators} from '../../models/validators';


@Component({
    selector: 'app-validator-input',
    templateUrl: './validator-input.component.html',
    styleUrls: ['./validator-input.component.scss']
})
export class ValidatorInputComponent implements OnInit {

    @Input() public type: string = 'text';
    @Input() public placeholder: string;
    @Input() public hint: string;
    @Input() public required: boolean = false;
    /**
     * Indicate if should display errors instantly
     */
    @Input() public instant: boolean = true;
    /**
     * Indicate if should send model changes to parent even with errors
     */
    @Input() public unsafe: boolean = false;
    @Input() public validators: ValidatorFn[] = [];

    /**
     * Model variable for tracking ngModel, only sent to the parent if there is no errors or if
     * unsafe is true.
     */
    @Input() public model: any;
    @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

    public formControl: FormControl = null;
    public matcher: ErrorStateMatcher;

    public ngOnInit() {

        let validators = [...this.validators];
        this.required && validators.push(Validators.required);
        this.matcher = this.instant ? new InstantMatcher() : void 0;

        this.formControl = new FormControl(this.placeholder, validators);

    }

    public onChange(data: any): void {

        //Hack to force validation on ngModelChange instead of after it
        if(this.unsafe || this.formControl.validator({value: data} as any) === null) {
            this.modelChange.emit(data);
        }
    }

    public readonly _CustomValidators = CustomValidators;

}
