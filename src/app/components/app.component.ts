
import {Component, HostListener} from '@angular/core';
import {ThemeService} from "../services/ThemeService";
import {AssignableObject} from "../models/AssignableObject";
import {Subscription} from "rxjs";
import {DestroySubscribers} from "../utils/decorators/DestroySubscribers";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
@DestroySubscribers()
export class AppComponent{

    public title: string = 'ActionTracker - Admin';
    public hasScrolled: boolean = false;
    public darkTheme: boolean = false;
    public subscribers: AssignableObject<Subscription> = {};

    constructor(public themeService:ThemeService){

        this.subscribers.theme = this.themeService.isDarkTheme()
            .subscribe(theme => {
                this.darkTheme = theme;
            });
    }

    @HostListener("window:scroll", [])
    public onWindowScroll() {
        this.hasScrolled = scrollY>20;
    }

    public toTop():void{
        window.scroll(0,0);
    }

}
