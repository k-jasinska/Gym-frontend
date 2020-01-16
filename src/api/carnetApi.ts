import axios from 'axios';

interface ICarnetList {
    data: [{
        carnetTypeID: string;
        price: number;
        name: string;
        duration: number;
        count: number;
    }]
}

export default {
    async getTypes(): Promise<ICarnetList> {
        return axios.get('/api/Carnet/Types')
    },

    async selectCarnet(id: any) {
        return axios.post('/api/Client/Select', { id: id }).catch(error => {
            throw new Error(error.message);
        });
    },

}