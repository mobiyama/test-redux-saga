import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { TestState, TestReducer } from './test/test.reducer';

export type State = {
  router: RouterState;
  test: TestState;
};

export const RootReducer = (history: History) => combineReducers<State>({
  router: connectRouter(history),
  test: TestReducer,
});
