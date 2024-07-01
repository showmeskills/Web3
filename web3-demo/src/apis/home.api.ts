import {
  CreateMnemonicResponse,
  FetchAccountResponse,
  FetchGetMnemonicResponse,
} from '@/interface/Home.interface';
import request from '@/utils/request';
import { PayloadAction } from '@reduxjs/toolkit';

export const getAccounts = <T>(params: PayloadAction<T>): FetchAccountResponse => {
  return request('/api/accounts', {
    params: params.payload,
    method: 'get',
  });
};

export const createMnemonic = <T>(data: PayloadAction<T>): CreateMnemonicResponse => {
  return request('/api/createMnemonic', {
    data: data.payload,
    method: 'post',
  });
};

export const getMnemonic = (): FetchGetMnemonicResponse => {
  return request('/api/mnemonic', {
    method: 'get',
  });
};

export const createAccount = async <T>(data: PayloadAction<T>) => {
  return await request('/api/createAccount', {
    params: data.payload,
    method: 'post',
  });
};
