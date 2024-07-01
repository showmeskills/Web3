import { AppRootState } from '@/interface/rootState.interface';
import { createSelector } from '@reduxjs/toolkit';

const selectAccountState = (state: AppRootState) => state.accountsReducer;
export const selectAccount = createSelector(selectAccountState, itemState => itemState.data);
export const selectAccountLoading = createSelector(
  selectAccountState,
  itemState => itemState.loading,
);

const selectMnemonicState = (state: AppRootState) => state.mnemonicSliceReducer;

export const selectMnemonic = createSelector(selectMnemonicState, itemsState => itemsState.data);
export const selectMnemonicLoading = createSelector(
  selectMnemonicState,
  itemsState => itemsState.loading,
);

const selectGetMnemonicState = (state: AppRootState) => state.getMnemonicSliceReducer;
export const selectGetMnemonicData = createSelector(selectGetMnemonicState, item => item.data);
export const selectGetMnemonicLoading = createSelector(
  selectGetMnemonicState,
  item => item.loading,
);
