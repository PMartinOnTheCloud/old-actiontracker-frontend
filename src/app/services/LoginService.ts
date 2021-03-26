
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject, Observable} from 'rxjs';
import {User} from 'actiontracker-entities';

import {AuthenticatedUser} from '../models/entities/';
import {serverEndpoints} from '../resources/ServerEndpoints';
import {SimpleHttpService} from './SimpleHttpService';



@Injectable()
export class LoginService {

    private username = new Subject<string>();

    constructor(private http: SimpleHttpService, private router: Router, private httpClient: HttpClient) { }

    public login(username, password): Promise<User> {
        return this.http.request<User>(serverEndpoints.login, {withCredentials: true}, {username, password});
    }

    public checkIfLoggedIn(): Promise<void> {

        return new Promise((resolve, reject) => {
            return this.http.request<User>(
                serverEndpoints.info,
                {withCredentials: true}
            ).then(
                data => {
                    this.username.next(data.name);
                    resolve();
                }, error => reject(error)
            );
        });

    }

    public logout(): void {
        this.http.request(serverEndpoints.logout, {withCredentials: true})
            .then(
                () => {
                    this.toLogin();
                }, error => console.error(error)
            );
    }

    public toLogin(): void {
        this.router.navigate(['/login']);
    }
    
    public getUser<T>(): Observable<T[]> {
        return this.httpClient.get<T[]>("http://localhost:3000/auth/info", {withCredentials: true});
    }
    
    public getUsername(): Observable<any> {
        return this.username.asObservable();
    }

}
