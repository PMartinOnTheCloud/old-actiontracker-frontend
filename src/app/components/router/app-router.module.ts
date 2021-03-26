
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../login';
import {TestComponent} from '../test/test.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {EntityModifierComponent} from '../entity-modifier/entity-modifier.component';
import {Entity, Installation, User} from '../../models/entities';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {RecoverUserOrPasswordComponent} from '../recover-user-or-password/recover-user-or-password.component';
import {ControlUsersComponent} from '../control-users/control-users.component';

// import {MapComponent} from '../map/map.component';


const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'test', component: TestComponent},
    {path: 'control', component: ControlUsersComponent},
    {path: 'installations', component: EntityModifierComponent,
        data: {entityName: 'installation', sortFunction: sortFunction}},
    {path: 'users', component: EntityModifierComponent,
        data: {entityName: 'user', sortFunction: sortFunction}},
    {path: 'recover-user-or-password', component: RecoverUserOrPasswordComponent},
    {path: 'profile', component: UserProfileComponent},
    // {path: 'map', component: MapComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

// Horrible fix for some kind of bug on angular-cli that causes to fail on first compilation
// of ng serve.
// TODO: check with future versions of angular-cli if this could became again an arrow function with correct types
export function sortFunction(a: any, b: any): number {
  return a.id - b.id;
}

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouter {}
