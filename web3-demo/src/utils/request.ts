import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  responseType: 'json',
  headers: {
    lang: 'zh-cn',
    merchant_no: process.env.MERCHANT,
    access_token: '5552231',
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const key = config.method === 'get' ? 'params' : 'data';
    config[key] = { ...config[key] };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    let errorFlag = false;
    let clearFlag = false;
    switch (response.data.code) {
      case 404:
        errorFlag = true;
        break;
      default:
        errorFlag = false;
        break;
    }
    if (clearFlag) {
    }
    if (errorFlag) {
      return Promise.reject(response.data.message);
    }

    return response.data;
  },
  error => {
    return Promise.reject({
      code: error.response.status,
      message: error.response.message || '',
      data: error.response.data,
    });
  },
);

export default function request<T, K>(
  url: string,
  params: AxiosRequestConfig<T> | undefined,
): Promise<AxiosResponse<{ code: number; message: string; data: K }>> {
  return instance(url, params);
}
