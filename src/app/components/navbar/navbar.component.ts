
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {DestroySubscribers} from '../../utils/decorators';
import {AssignableObject} from '../../models/AssignableObject';
import {ThemeService} from '../../services/ThemeService';
import {TranslationService} from '../../services/TranslationService';
import {LoginService} from '../login';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
@DestroySubscribers()
export class NavbarComponent {

    @Input() public title: string = '';

    public username: string;
    public userIsLogged: boolean = false;
    public darkTheme: boolean;
    public subscribers: AssignableObject<Subscription> = {};

    constructor(private loginService: LoginService, public themeService: ThemeService,
                private router: Router, public translate: TranslationService) {

        this.subscribers.login = this.loginService.getUsername().subscribe(username => {
            this.username = username;
            this.userIsLogged = true;
        });

        this.subscribers.theme = this.themeService.isDarkTheme().subscribe(theme => {
            this.darkTheme = theme;
        });

    }

    public logout(): void {
        this.loginService.logout();
        this.userIsLogged = false;
    }

    public goProfile(): void {
        this.router.navigateByUrl('/profile');
    }

}
