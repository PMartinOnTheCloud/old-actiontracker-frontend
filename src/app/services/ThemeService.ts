
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import {IStorage, StorageFactory} from '../models/entities/storage';


@Injectable()
export class ThemeService {

    private darkThemeSubject: BehaviorSubject<boolean>;
    private darkTheme: boolean;
    private storage: IStorage;

    constructor() {
        this.storage = StorageFactory.get();
        this.darkTheme = this.storage.get('theme', false);
        this.darkThemeSubject = new BehaviorSubject<boolean>(this.darkTheme);
    }

    public swapTheme() {
        this.darkTheme = !this.darkTheme;
        this.storage.set('theme', this.darkTheme);
        this.darkThemeSubject.next(this.darkTheme);
    }

    public isDarkTheme(): Observable<any> {
        return this.darkThemeSubject.asObservable();
    }

}
