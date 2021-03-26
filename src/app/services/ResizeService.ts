
import {HostListener, Injectable} from '@angular/core';
import {Subject, Observable, BehaviorSubject} from "rxjs";


@Injectable()
export class ResizeService {

    private readonly MOBILE_WIDTH: number = 768;

    private mobileSubject: BehaviorSubject<boolean>;
    private isMobile: boolean;

    constructor() {
        this.isMobile = this.mobileCheck();
        this.mobileSubject = new BehaviorSubject<boolean>(this.isMobile);

        window.onresize = this.onResize.bind(this);
    }

    private onResize(event) {

        let aux = this.mobileCheck(event.target);

        if(this.isMobile != aux) {
            this.isMobile = aux;
            this.mobileSubject.next(aux);
        }

    }

    public getIsMobile(): Observable<any> {
        return this.mobileSubject.asObservable();
    }

    private mobileCheck(target: any = window): boolean {
        return target.innerWidth < this.MOBILE_WIDTH;
    }

}
