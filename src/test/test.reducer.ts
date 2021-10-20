import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TestParam, TestActions } from './test.action';

export type TestState = TestParam;

const initialState: TestState = {
  str: '',
  age: '',
  remarks: '',
};

export const TestReducer = reducerWithInitialState<TestState>(
  initialState,
).case(TestActions.test.set, (state, payload) => {
  return { ...state, ...payload };
});
