import {
  AccountListState,
  CreateMnemonicState,
  GetMnemonicState,
} from '@/interface/Home.interface';
import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

const accountListState: AccountListState = {
  data: null,
  loading: false,
  error: null,
};

const accountListReducer: SliceCaseReducers<AccountListState> = {
  fetchAccount(state) {
    state.loading = true;
  },
  fetchAccountSuccess(state, action) {
    state.loading = false;
    state.data = action.payload;
  },
  fetchAccountError(state, action) {
    state.loading = false;
    state.error = true;
    state.data = action.payload;
  },
};

const accountListSlice = createSlice({
  name: 'accounts',
  initialState: accountListState,
  reducers: accountListReducer,
});

export const { fetchAccount, fetchAccountSuccess, fetchAccountError } = accountListSlice.actions;

export const accountsReducer = accountListSlice.reducer;

export const mnemonicState: CreateMnemonicState = {
  loading: false,
  data: null,
  error: null,
};

const mnemonicReducer: SliceCaseReducers<CreateMnemonicState> = {
  createMnemonic(state) {
    state.loading = true;
  },
  createMnemonicSuccess(state, action) {
    state.loading = false;
    state.data = action.payload;
  },
  createMnemonicError(state, action) {
    state.loading = false;
    state.error = true;
    state.data = action.payload;
  },
  resetMnemonicState(state) {
    state.loading = false;
    state.error = false;
    state.data = null;
  },
};

const mnemonicSlice = createSlice({
  name: 'mnemonic',
  initialState: mnemonicState,
  reducers: mnemonicReducer,
});

export const { createMnemonic, createMnemonicSuccess, createMnemonicError, resetMnemonicState } =
  mnemonicSlice.actions;

export const mnemonicSliceReducer = mnemonicSlice.reducer;

const getMnemonicState: GetMnemonicState = {
  loading: false,
  data: null,
  error: null,
};

const getMnemonicReducer: SliceCaseReducers<GetMnemonicState> = {
  getMenmonic(state) {
    state.loading = true;
  },
  getMenmonicSuccess(state, action) {
    state.loading = false;
    state.data = action.payload;
  },
  getMenmonicError(state, action) {
    state.loading = false;
    state.error = true;
    state.data = action.payload;
  },
};

const getMnemonicSlice = createSlice({
  name: 'getMnemonic',
  initialState: getMnemonicState,
  reducers: getMnemonicReducer,
});

export const { getMenmonic, getMenmonicSuccess, getMenmonicError } = getMnemonicSlice.actions;

export const getMnemonicSliceReducer = getMnemonicSlice.reducer;
