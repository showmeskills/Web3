import { AccountListState, CreateMnemonicState, GetMnemonicState } from './Home.interface';

export interface AppRootState {
  appReducer: {
    count: number;
  };
  accountsReducer: AccountListState;
  mnemonicSliceReducer: CreateMnemonicState;
  getMnemonicSliceReducer: GetMnemonicState;
}
