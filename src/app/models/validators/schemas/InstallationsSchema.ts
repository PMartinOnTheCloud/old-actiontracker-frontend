
import {ValidationSchema} from './ValidationSchema';


export let InstallationsSchema: ValidationSchema = {
    id: {
        type: Number,
        required: true,
    },
    auth: {
        type: Number,
        validators: {
            range: [0, 5],
        },
        required: true,
    },
    name: {
        type: String,
        validators: {
            textLimit: [100],
        },
        required: true,
    },
    client: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
    },
    imgFile: {
        type: String, //TODO: File type
        required: true,
    },
    markerCommOn: {
        type: String, //TODO: File type
        required: true,
    },
    markerCommOff: {
        type: String, //TODO: File type
        required: true,
    },
    commState: {
        type: Boolean,
    },
    activeAlarms: {
        type: Number,
    },
    refreshPeriod: {
        type: Number,
        required: true,
    },
    timezone: {
        type: String,
    },
    timezonePub: {
        type: String,
    },
    sendMail: {
        type: Boolean,
    },
    modified: {
        type: Date, //TODO: Date
    },
    shownVariables: {
        type: String //TODO: Referenced type
    },
    tags: {
        type: String //TODO: Referenced type
    },
    properties: {
        type: String //TODO: Referenced type
    }
};
