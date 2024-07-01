import { createMnemonic as createMnemonicApi, getAccounts, getMnemonic } from '@/apis/home.api';
import {
  Accounts,
  CreateMnemonicData,
  FetchAccountParams,
  Mnemonic,
} from '@/interface/Home.interface';
import { AxiosResponseData } from '@/interface/base.interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { CallEffect, PutEffect, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  createMnemonicError,
  createMnemonicSuccess,
  fetchAccount,
  fetchAccountError,
  fetchAccountSuccess,
  createMnemonic as generateMnemonic,
  getMenmonic,
  getMenmonicError,
  getMenmonicSuccess,
} from '../modules/home.module';

function* getAccountList(
  action: PayloadAction<FetchAccountParams>,
): Generator<
  CallEffect<AxiosResponseData<Accounts[]>> | PutEffect,
  void,
  AxiosResponse<AxiosResponseData<Accounts[]>>
> {
  try {
    const response = yield call(getAccounts<FetchAccountParams>, action);
    yield put(fetchAccountSuccess(response.data));
  } catch (error: any) {
    yield put(fetchAccountError(error.data));
  }
}

function* watchGetAccountList() {
  yield takeLatest(fetchAccount.type, getAccountList);
}

function* createMnemonic(
  actions: PayloadAction<CreateMnemonicData>,
): Generator<
  CallEffect<AxiosResponseData<boolean>> | PutEffect,
  void,
  AxiosResponse<AxiosResponseData<boolean>>
> {
  try {
    const response = yield call(createMnemonicApi<CreateMnemonicData>, actions);
    yield put(createMnemonicSuccess(response.data));
  } catch (error: any) {
    yield put(createMnemonicError(error.data));
  }
}

function* watchCreateMnemonic() {
  yield takeLatest(generateMnemonic.type, createMnemonic);
}

function* getExistMnemonic(): Generator<
  CallEffect<AxiosResponseData<Mnemonic>> | PutEffect,
  void,
  AxiosResponse<AxiosResponseData<Mnemonic>>
> {
  try {
    const response = yield call(getMnemonic);
    yield put(getMenmonicSuccess(response.data));
  } catch (error: any) {
    yield put(getMenmonicError(error.data));
  }
}

function* watchGetExistMnemonic() {
  yield takeLatest(getMenmonic.type, getExistMnemonic);
}

export const homeWatches = [
  fork(watchGetAccountList),
  fork(watchCreateMnemonic),
  fork(watchGetExistMnemonic),
];
