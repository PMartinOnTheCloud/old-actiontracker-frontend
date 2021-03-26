
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

import {DashboardElement} from '../../models/entities';
import {LoginService} from '../login';
import {DestroySubscribers} from '../../utils/decorators';
import {AssignableObject} from '../../models/AssignableObject';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@DestroySubscribers()
export class DashboardComponent implements OnInit {

    public dashboardItems: DashboardElement[];
    public subscribers: AssignableObject<Subscription> = {};

    public constructor(private service: LoginService) {}

    ngOnInit() {
        this.service.checkIfLoggedIn().then(() => {
            this.setDashboardItems();
        }).catch(() => {
            this.service.toLogin();
        });

    }

    private setDashboardItems(): void {

        this.dashboardItems = [
            {
                title: 'clients',
                icon: 'perm_identity',
                route: '',
                description: 'DASHBOARD.CLIENTS',
                color: '#b72233'
            },
            {
                title: 'users',
                icon: 'group',
                route: '/users',
                description: 'DASHBOARD.USERS',
                color: 'violet'
            },
            {
                title: 'installations',
                icon: 'dns',
                route: '/installations',
                description: 'DASHBOARD.INSTALLATIONS',
                color: '#ff8822'
            },
            {
                title: 'sensors',
                icon: 'settings_input_antenna',
                route: '',
                description: 'DASHBOARD.SENSORS',
                color: '#ff77bb'
            },
            {
                title: 'variables',
                icon: 'explore',
                route: '',
                description: 'DASHBOARD.VARIABLES',
                color: '#bbffaa'
            },
            {
                title: 'graphics',
                icon: 'important_devices',
                route: '',
                description: 'DASHBOARD.GRAPHICS',
                color: '#dd5533'
            },
            {
                title: 'ships',
                icon: 'directions_boat',
                route: '',
                description: 'DASHBOARD.SHIPS',
                color: '#b2ba22'
            },
            {
                title: 'map',
                icon: 'person_search',
                route: '/control',
                description: 'DASHBOARD.CONTROL-USERS',
                color: '#0DAE0B'
            },
            {
                title: 'other',
                icon: 'settings',
                route: '',
                description: 'DASHBOARD.SETTINGS',
                color: '#323232'
            },
        ];

    }

}
