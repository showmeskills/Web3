import { AppConstants } from '@/constants';
import { createActions, handleActions } from 'redux-actions';
const state = {
  count: 0,
};

export const actions = createActions({
  [AppConstants.INCREMENT]: count => ({ count }),
  [AppConstants.DECREMENT]: count => ({ count }),
  [AppConstants.RESET]: () => ({}),
});

export const appReducer = handleActions(
  {
    [AppConstants.INCREMENT]: (state, payload) => {
      return {
        ...state,
        count: state.count + payload.payload.count,
      };
    },
    [AppConstants.DECREMENT]: (state, payload) => ({
      ...state,
      count: state.count - payload.payload.count,
    }),
    [AppConstants.RESET]: state => ({
      ...state,
      count: 0,
    }),
  },
  state,
);

// export const { increment, decrement, reset } = createActions({
//   INCREMENT: count => ({ count }),
//   DECREMENT: count => ({ count }),
//   RESET: () => ({}),
// });

// export const combinedAppActions = combineActions(increment, decrement, reset) as any;

// export const appReducer = handleActions(
//   {
//     [combinedAppActions]: (state, payload) => {
//       switch (payload.type) {
//         case 'INCREMENT':
//           return {
//             ...state,
//             count: state.count + payload.payload.count,
//           };
//         case 'DECREMENT':
//           return {
//             ...state,
//             count: state.count - payload.payload.count,
//           };
//         default:
//           return {
//             ...state,
//             count: 0,
//           };
//       }
//     },
//   },
//   state,
// );
