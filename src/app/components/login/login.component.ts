import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

import {LoginService} from '../../services/LoginService';
import {DestroySubscribers} from '../../utils/decorators';
import {AssignableObject} from '../../models/AssignableObject';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
@DestroySubscribers()
export class LoginComponent implements OnInit {


    public username: string;
    public password: string;
    public authFailed: boolean = false;
    public subscribers: AssignableObject<Subscription> = {};


    public constructor(private loginService: LoginService, private router: Router) {}

    public ngOnInit() { }

    public onFormSubmit(): void {
        this.checkUserAndPassword();
    }

    // TODO: this is temporal, ngForm directive already have a valid attribute, but it works only if
    // the inputs are not inside other directives, need to find a solution for this.
    public isValid() {
        return this.username && this.password;
    }

    public resetFields(): void {
        this.username = this.password = '';
    }

    public checkUserAndPassword(): void {

        this.loginService.login(this.username, this.password).then(data => {
            this.router.navigate(['/dashboard']);
        }, (err) => {
            this.authFailed = true;
            this.resetFields();
        });

    }

}
