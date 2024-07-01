import { AxiosResponseData, BaseInterface } from './base.interface';

export interface Accounts {
  address: string;
  privateKey: string;
  mnemonic: string;
  balance: number;
}
export type AccountListState = BaseInterface<Accounts[]>;
export type FetchAccountResponse = Promise<AxiosResponseData<Accounts[]>>;
export type FetchAccountParams = {
  accountId: string;
};

export type CreateMnemonicState = BaseInterface<boolean>;
export type CreateMnemonicResponse = Promise<AxiosResponseData<boolean>>;
export type CreateMnemonicData = {
  mnemonic: string;
  password: string;
};

export interface Mnemonic {
  mnemonic: string;
}
export type GetMnemonicState = BaseInterface<Mnemonic>;
export type FetchGetMnemonicResponse = Promise<AxiosResponseData<Mnemonic>>;
