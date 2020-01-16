import axios from 'axios';

interface ITraining {
    data: [{
        trainingID: string;
        title: string;
        type: any;
        start: Date;
        duration: any;
        quantity: number;
        count: number;
        trainer: {
            name: string;
            surname: string;
        }
    }]
}

export default {
    async loadGroupTraining(): Promise<ITraining> {
        return axios.get('/api/Client/GroupTraining')
    },
    async loadMyTraining(): Promise<ITraining> {
        return axios.get('/api/Client/MyTraining')
    },

    async loadIndividualTraining(): Promise<ITraining> {
        return axios.get('/api/Client/IndividualTraining')
    },

    async takePart(id: string) {
        return axios.post('/api/Client/TakePart', { id: id }).catch(error => {
            throw new Error(error.message);
        });
    },

    async unsubscribe(selected: string[]) {
        return axios.delete('/api/Client/', { data: selected }).catch(error => {
            throw new Error(error.message);
        });
    },

}