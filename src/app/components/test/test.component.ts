
import {Component} from '@angular/core';

import {InstallationsSchema, CustomValidators} from '../../models/validators';


@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {


    // @ViewChild(MatInput) private input: MatInput;


    public test1Model: string = '';

    public validatorsTest1 = [
        CustomValidators.textLimit(30),
        CustomValidators.email,
    ];

    public validatorsTest2 = [
        CustomValidators.range(3,25),
    ];

    public analogicData:Array<any> = [
        {data: [6, 20, 40, 11, 80, 55, 40, 43], label: 'Analogic'},
    ];

    public digitalData:Array<any> = [
        {data: [1, 0, 1, 0, 1, 1, 1, 0], label: 'Digital'},
    ];

    public lineChartLabels:Array<string> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August'
    ];

    public lineChartOptions:any = {
        responsive: true,
    };

    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'limegreen',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            borderDash: [10],
            cubicInterpolationMode: 'monotone',
        },
        // { // dark grey
        //     backgroundColor: 'rgba(77,83,96,0.2)',
        //     borderColor: 'rgba(77,83,96,1)',
        //     pointBackgroundColor: 'rgba(77,83,96,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(77,83,96,1)'
        // },
        // { // grey
        //     backgroundColor: 'rgba(148,159,177,0.2)',
        //     borderColor: 'rgba(148,159,177,1)',
        //     pointBackgroundColor: 'rgba(148,159,177,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        // }
    ];

    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public schema = InstallationsSchema;
    public item = {
        id: 1,
        auth: 0,
        name: 'SEAT Sucursal BCN',
        client: 1,
        longitude: 2.140261,
        latitude: 41.338711,
        active: true,
        imgFile: '/dev/null',
        markerCommOn: '/dev/null',
        markerCommOff: '/dev/null',
        commState: true,
        activeAlarms: 0,
        refreshPeriod: 36000,
        timezone: 'Europe/Madrid',
        timezonePub: 'GMT',
        sendMail: false,
        modified: '2018-02-10T18:33:39.000Z',
        shownVariables: [],
        tags: [],
        properties: []
    };
}
