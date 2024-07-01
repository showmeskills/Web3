import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './modules/app.module.ts';
import {
  accountsReducer,
  getMnemonicSliceReducer,
  mnemonicSliceReducer,
} from './modules/home.module.ts';

const rootReducer = combineReducers({
  appReducer,
  accountsReducer,
  mnemonicSliceReducer,
  getMnemonicSliceReducer,
});

export default rootReducer;
