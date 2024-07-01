import { AxiosResponse } from 'axios';

export interface BaseInterface<T> {
  loading: boolean;
  error: boolean | null;
  data: T | null;
}

export interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

export type AxiosResponseData<T> = AxiosResponse<ResponseData<T>>;
