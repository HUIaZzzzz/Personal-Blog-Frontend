import axios from 'axios';

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:8000/api',
  headers: { "Content-Type": "application/json" }
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
        .get<FetchResponse<T>>(this.endpoint)
        .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
        .get<T>(this.endpoint + '/' + id)
        .then((res) => res.data);
  };
}

export default APIClient;