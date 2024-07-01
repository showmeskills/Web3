import { all } from 'redux-saga/effects';
import { homeWatches } from './home.sage';

export default function* rootSaga() {
  yield all([...homeWatches]);
}
