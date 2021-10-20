import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { RootReducer, State } from './root.reducer';
import { RootSaga } from './root.saga';

// history
export const history = createHashHistory();

// redux-saga
const sagaMiddleWare = createSagaMiddleware();

// redux-persist

// redux-logger

// redux-loggerの切り替え
const isLogger = false;

// ストア生成
export const ConfigureStore = (preloadState?: State) => {
  // const middleware = [sagaMiddleWare, routerMiddleware(history)];
  const middleware = isLogger
    ? [ sagaMiddleWare, routerMiddleware(history)]
    : [sagaMiddleWare, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const store = createStore(
    RootReducer(history),
    preloadState as any,
    middlewareEnhancer,
  );
  sagaMiddleWare.run(RootSaga);
  return { store };
};

const obj = ConfigureStore();
export const Store = obj.store;
