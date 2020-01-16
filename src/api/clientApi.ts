import axios from 'axios';


interface IAccountDetails {
    data: {
        name: string;
        surname: string;
        email: string;
        contactData: number;
        sex: string;
        address: string;
        profileComplete: boolean;
        carnets: [{
            type: Type;
            isActive: boolean;
            dateEnd: any;
            dateStart: any;
        }]
    }
}

interface Type {
    duration: number;
    name: string;
    price: number;
}

interface Details {
    name: string;
    surname: string;
    email: string;
    contactData: any;
    sex: any;
    address: string;
}

interface IComplete {
    data: {
        complete: any;
        active: any;
        exist: any;
    }
}

interface Entrance {
    data: {
        carnetId: any;
        dates: Date[];
        type: any;
        dateStart: Date;
        dateEnd: Date;
    }
}
interface ParamId {
    id: string;
}
interface Password {
    oldPassword: string;
    newPassword: string;
}

class ValidError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'ValidError';
        this.message = message;
    }
}

export default {
    async getDetails(): Promise<IAccountDetails> {
        return axios.get('/api/Client/Details')
    },
    async getDetailsById(id: string): Promise<IAccountDetails> {
        return axios.get(`/api/Admin/Details?id=${id}`)
    },

    async isComplete(): Promise<IComplete> {
        return axios.get('/api/Client/CheckComplete')
    },

    async isCompleteById(id: string): Promise<IComplete> {
        return axios.get(`/api/Admin/CheckCompleteById?id=${id}`)
    },

    async updateProfile(values: Details) {
        return this.put('/api/Client/Details', values).catch(error => {
            if (error.response.status === 400) {
                throw new ValidError(error.response.data);
            } else {
                throw new Error(error.message);
            }
        });
    },

    async updateProfileById(values: Details, id: string) {
        return this.put(`/api/Admin/Details?id=${id}`, values).catch(error => {
            if (error.response.status === 400) {
                throw new ValidError(error.response.data);
            } else {
                throw new Error(error.message);
            }
        });
    },

    async changePassword(dto: Password) {
        return axios.put('/api/Client/ChangePass', dto).catch(error => {
            if (error.response.status === 400) {
                throw new ValidError(error.response.data);
            } else {
                throw new Error(error.message);
            }
        });
    },

    async createEntrance(id: ParamId) {
        return this.postEntrance('/api/Admin/Entrance', id).catch(error => {
            if (error.response.status === 400) {
                throw new ValidError(error.response.data);
            } else {
                throw new Error(error.message);
            }
        });
    },

    postEntrance(url: string, body: ParamId) {
        return axios.post(url, body);
    },


    async loadEntrance(id: string): Promise<Entrance> {
        return this.getEntrance('/api/Admin/GetEntrance', { id })
    },

    async loadClientEntrance(): Promise<Entrance> {
        return axios.get('/api/Client/GetEntrance')
    },

    getEntrance(url: string, params: ParamId) {
        return axios.get(url, {
            params: params
        });
    },

    put(url: string, body: Details) {
        return axios.put(url, body);
    },
}