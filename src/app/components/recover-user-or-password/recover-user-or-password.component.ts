import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ResizeService} from '../../services/ResizeService';
import {Subscription} from 'rxjs';
import {AssignableObject} from '../../models/AssignableObject';
import {DestroySubscribers} from '../../utils/decorators/DestroySubscribers';

@Component({
    selector: 'app-recover-user-or-password',
    templateUrl: './recover-user-or-password.component.html',
    styleUrls: ['./recover-user-or-password.component.scss']
})
@DestroySubscribers()
export class RecoverUserOrPasswordComponent implements OnInit {

    public isLinear = true;

    public firstFormGroup: FormGroup;
    public secondFormGroup: FormGroup;
    public thirdFormGroup: FormGroup;
    public isMobile: boolean = false;
    public subscribers: AssignableObject<Subscription> = {};


    public recoverSelect = [
        {value: 'user', viewValue: 'User'},
        {value: 'password', viewValue: 'Password'},
        {value: 'both', viewValue: 'Both'}
    ];

    public email:string;

    constructor(private _formBuilder: FormBuilder, private router:Router,
                private resizeService: ResizeService) {

        this.subscribers.resizeService = this.resizeService.getIsMobile()
            .subscribe(data => {
                this.isMobile = data;
            });

    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
    }

    public goLogin(){
        this.router.navigateByUrl('/login');
    }
}
