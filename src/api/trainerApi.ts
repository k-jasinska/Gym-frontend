import axios from 'axios';

interface Body {
    title: string;
    type: string;
    start: Date;
    quantity: number;
    duration: any;
}

interface ITrainingList {
    data: [{
        trainingID: string;
        title: string;
        type: string;
        start: Date;
        duration: any;
        trainer: any;
    }];
}

interface IAccountDetails {
    data: {
        name: string;
        surname: string;
        email: string;
        contactData: any;
        address: string;
        profileComplete: boolean;
        training: [{
            trainingID: string;
            title: string;
            type: any;
            start: Date;
            duration: any;
            quantity: any;
            count: number;
        }]
    }
}

interface ITraining {
    data: [{
        trainingID: string;
        title: string;
        type: any;
        start: Date;
        duration: any;
        quantity: number;
        count: number;
    }]
}

interface IndividualTrening {
    data: [{
        trainingID: string;
        title: string;
        start: Date;
        duration: any;
        quantity: number;
        count: number;
        name: string;
        surname: string;
    }]
}


interface ParamEnds {
    ends: boolean;
}
interface ParamId {
    id: string;
}

interface People {
    data: [{
        name: string;
        surname: string;
    }]
}

class ValidError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'ValidError';
        this.message = message;
    }
}

export default {
    async createEvent(event: Body) {
        return this.post('/api/Trainer', event).catch(error => {
            if (error.response.status === 400) {
                throw new ValidError(error.response.data);
            } else {
                throw new Error(error.message);
            }
        });
    },

    async getDetails(): Promise<IAccountDetails> {
        return axios.get('/api/Trainer/Details')
    },
    getTraining(): Promise<ITrainingList> {
        return this.get(`/api/Trainer`);
    },

    async loadGroupTraining(ends: boolean): Promise<ITraining> {
        return this.getList('/api/Trainer/GroupTrening', { ends })
    },

    async loadIndividualTraining(ends: boolean): Promise<IndividualTrening> {
        return this.getList('/api/Trainer/IndividualTrening', { ends })
    },

    async loadPersonList(id: string): Promise<People> {
        return this.getPersonList('/api/Trainer/Participants', { id })
    },

    getPersonList(url: string, params: ParamId) {
        return axios.get(url, {
            params: params
        });
    },

    getList(url: string, params: ParamEnds) {
        return axios.get(url, {
            params: params
        });
    },

    get(url: string) {
        return axios.get(url);
    },

    post(url: string, body: Body) {
        return axios.post(url, body);
    },

};
