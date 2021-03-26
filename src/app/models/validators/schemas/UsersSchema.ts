
import {ValidationSchema} from './ValidationSchema';


export let UsersSchema: ValidationSchema = {
    id: {
        type: Number,
        required: true,
    },
    client: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        validators: {
            textLimit: [10],
        },
        required: true,
    },
    login: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true,
    },
    auth: {
        type: Number,
        validators: {
            range: [0,5]
        },
        required: true,
    },
    active: {
        type: Boolean,
    },
    email: {
        type: String,
        validators: {
            email: null,
        },
        required: true,
    },
    receiveAlert: {
        type: Boolean,
    },
    modified: {
        type: Date,
    },
    rights: {
        type: String //TODO: Referenced type
    }
};
