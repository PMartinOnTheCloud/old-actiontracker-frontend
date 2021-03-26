

export interface Installation {

    id: number;

    auth: number;

    client: number;

    active: boolean;

    activeAlarms: number;

    commState: boolean;

    imgFile: string;

    latitude: number;

    longitude: number;

    markerCommOff: string;

    markerCommOn: string;

    modified: string;

    name: string;

    // TODO: create this interface instead of any
    properties: Array<any>;

    refreshPeriod: number;

    sendMail: boolean;

    // TODO: create this interface instead of any
    shownVariables: Array<any>;

    // TODO: create this interface instead of any
    tags: Array<any>;

    timezone: string;

    timezonePub: string;

}
