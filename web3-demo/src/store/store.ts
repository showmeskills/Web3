// import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from "redux-devtools-extension";

// import rootReducer from "./rootReducer";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

// const defaultState = {};

// const middleware = [sagaMiddleware];

// const store = createStore(
//   rootReducer,
//   defaultState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// sagaMiddleware.run(rootSaga);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas';

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

// 配置store
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// 运行saga
sagaMiddleware.run(rootSaga);

export default store;
