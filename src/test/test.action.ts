import actionCreatorFactory from 'typescript-fsa';

export const ActionCreator = actionCreatorFactory('test');

export type TestParam = {
  str: string;
  age: string;
  remarks: string;
}

export const TestActions = {
  test: {
    api: {
      get: ActionCreator<{ param: TestParam, callback?: (v:TestParam) => void;}>('test/api/get'),
      post:ActionCreator<TestParam>('test/api/post'),
      delete:ActionCreator('test/api/delete'),
    },
    set:ActionCreator<TestParam>('test/set'),
  }
};
