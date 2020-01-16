import axios from 'axios';

interface Params {
  page: number;
  rowsPerPage: number;
}

interface SearchParam {
  page: number;
  rowsPerPage: number;
  value: string;
}

interface Delete {
  selected: string[];
}

interface Body {
  name: string;
  surname: string;
  email: string;
  login: string;
  role: string;
}

interface Personnel {
  personID: string;
  name: string;
  surname: string;
  address: string;
  contactData: string;
  email: string;
  login: string;
  profileComplete: boolean;
  exist: boolean;
  isActive: boolean;
}

interface Carnet {
  price: number;
  name: string;
  duration: number;
}

interface IPagedPersonnel {
  data: {
    items: Personnel[];
    totalCount: number;
    page: number;
    rowsPerPage: number;
  };
}

interface ICountStatistics {
  data: {
    lastEntrances: number;
    allClient: number;
    allTrainer: number;
    allCarnets: number;
  };
}
interface IUsersByCarnets {
  data: [{
    carnetName: string;
    countUsers: number;
    percent: number;
  }];
}

interface IChartData {
  data: [{
    month: number;
    entranceCount: number;
    individualCount: number;
    groupCount: number;
  }];
}
interface IChartWeekData {
  data: [{
    day: number;
    entranceCount: number;
    individualCount: number;
    groupCount: number;
  }];
}

class ValidError extends Error {
  constructor(message: any) {
    super(message);
    this.name = 'ValidError';
    this.message = message;
  }
}

export default {
  getItems(rowsPerPage: number, page: number, type: string): Promise<IPagedPersonnel> {
    return this.get(`/api/Admin/${type}`, { page, rowsPerPage });
  },

  async createItem(person: Body) {
    return this.post('/api/Admin', person).catch(error => {
      if (error.response.status === 400) {
        throw new ValidError(error.response.data);
      } else {
        throw new Error(error.message);
      }
    });
  },

  async createCarnet(carnet: Carnet) {
    return this.postCarnet('/api/Admin/Carnet', carnet).catch(error => {
      if (error.response.status === 400) {
        throw new ValidError(error.response.data);
      } else {
        throw new Error(error.message);
      }
    });
  },


  async search(rowsPerPage: number, page: number, value: string, type: string): Promise<IPagedPersonnel> {
    return this.getSearch(`/api/Admin/Search/${type}`, { page, rowsPerPage, value });
  },

  async checkLogin(login: string) {
    return axios.get(`/api/Admin/loginValidation?login=${login}`)
      .then(res => {
        if (res.data.message) {
          throw new ValidError(res.data);
        }
      })
  },

  async activeAccount(id: string) {
    return axios.put('/api/Admin/Activate', { id: id }).catch(error => {
      throw new Error(error.message);
    });
  },

  async checkRole() {
    return axios.get('/api/Admin/checkRole').catch(error => {
      throw new Error(error.message);
    })
  },

  async CountStatistics(): Promise<ICountStatistics> {
    return axios.get('/api/Admin/CountStatistics').catch(error => {
      throw new Error(error.message);
    })
  },

  async UsersByCarnets(): Promise<IUsersByCarnets> {
    return axios.get('/api/Admin/UsersByCarnets').catch(error => {
      throw new Error(error.message);
    })
  },

  async Chart(): Promise<IChartData> {
    return axios.get('/api/Admin/Chart').catch(error => {
      throw new Error(error.message);
    })
  },

  async ChartWeek(): Promise<IChartWeekData> {
    return axios.get('/api/Admin/ChartWeek').catch(error => {
      throw new Error(error.message);
    })
  },

  async deleteItems(selected: string[]) {
    return axios.delete('/api/Admin', { data: selected }).catch(error => {
      throw new Error(error.message);
    })
  },

  get(url: string, params: Params) {
    return axios.get(url, {
      params: params
    });
  },

  getSearch(url: string, params: SearchParam) {
    return axios.get(url, {
      params: params
    });
  },

  delete(url: string, params: Delete) {
    return axios.delete(url, {
      params: params
    });
  },
  post(url: string, body: Body) {
    return axios.post(url, body);
  },
  postCarnet(url: string, body: Carnet) {
    return axios.post(url, body);
  }
};
