import { all, fork } from 'redux-saga/effects';
import { TestSaga } from './test/test.saga';


export const RootSaga = function* root() {
  yield all([
    fork(TestSaga),
  ]);
};
