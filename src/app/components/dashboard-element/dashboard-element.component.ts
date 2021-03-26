
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'dashboard-element',
    templateUrl: './dashboard-element.component.html',
    styleUrls: ['./dashboard-element.component.scss']
})
export class DashboardElementComponent {

    @Input() public icon: string = '';
    @Input() public route: string = '';
    @Input() public description: string = '';
    @Input() public color: string = '';

    constructor(private router: Router){}

    public goEntityModifier(){
        this.router.navigateByUrl(this.route);
    }

}
