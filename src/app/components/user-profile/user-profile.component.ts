
import { Component, OnInit } from '@angular/core';

import {LoginService} from '../../services/LoginService';
import {Router} from '@angular/router';
import {DestroySubscribers} from '../../utils/decorators/';
import {Subscription} from 'rxjs';
import {AssignableObject} from '../../models/AssignableObject';
import {EntityService} from '../../services/EntityService';
import {User} from '../../models/entities/';
import {TranslationService} from '../../services/TranslationService';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
@DestroySubscribers()
export class UserProfileComponent implements OnInit{

    public user:User;
    public username: string;
    public subscribers: AssignableObject<Subscription> = {};
    public propsConfig = {'name':false, 'email':true };

    constructor(private loginService: LoginService, private router: Router,
                public translate: TranslationService, private entityService: EntityService) {}

    ngOnInit() {

        this.loginService.checkIfLoggedIn().catch(() => {
            this.loginService.toLogin();
        });

        this.subscribers.login = this.loginService.getUsername().subscribe(username => {
            this.username = username;
        });

        //TODO: When our server has been finished, change this and request only the apropiate user. Not all and then filter.
        this.subscribers.entityService = this.entityService.getEntity<User>('user')
            .subscribe(
                //TODO collect user's id and store it in loginService.
                users => {
                    this.user = users[0];
                },
                error => {
                    console.log(error);
                }
            );
    }

    public checkIfPropExist(property:string): boolean{

        for (let key in this.propsConfig) {
            if(key == property)
                return true;
        }

        return false;
    }

    public checkIfPropEditable(property:string): boolean{

        for (let key in this.propsConfig) {
            if(key == property)
                if(this.propsConfig[key])
                    return true;
        }

        return false;
    }

    public editPropValue(property:string):void{
        alert('edit ' + property);
    }

}
