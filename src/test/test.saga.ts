import { takeEvery } from 'redux-saga/effects';
import { Store } from '../store';
import { TestActions } from './test.action';

type Res<T = any> = { args: T; form: T };

function* tryTest({ payload }: ReturnType<typeof TestActions.test.api.get>) {
  const { str: _str, age: _age, remarks: _remarks } = payload.param;
  const str = _str ? `str=${_str}` : '';
  const age = _age ? `age=${_age}` : '';
  const remarks = _remarks ? `remarks=${_remarks}` : '';

  // -------------------------------------------------------------------
  yield fetch(`http://httpbin.org/get?${str}&${age}&${remarks}`)
    .then((res) => res.json())
    .then((v: Res<typeof payload.param>) => {
      if (payload.callback) {
        payload.callback(v.args)
        return
      }
      Store.dispatch(TestActions.test.set(v.args));
    });

  // // -------------------------------------------------------------------
  // const result: Res<typeof payload> = yield fetch(
  //   `http://httpbin.org/get?${str}&${age}&${remarks}`,
  // ).then((res) => res.json());
  // yield put(TestActions.test.set(result.args))
}

function* tryTestPost({
  payload,
}: ReturnType<typeof TestActions.test.api.post>) {
  const formData = new FormData();
  formData.append('str', payload.str);
  formData.append('age', String(payload.age));
  formData.append('remarks', payload.remarks);

  yield fetch(`http://httpbin.org/post`, {
    method: 'POST',
    mode: 'cors',
    body: formData,
  })
    .then((res) => res.json())
    .then((v: Res<typeof payload>) => {
      console.log('結果', v.form.age);
    })
    .catch(() => {
      console.log('error');
    });
}

function* tryTestDelete() {
  yield fetch(`http://httpbin.org/delete`, {
    method: 'DELETE',
    mode: 'cors',
  })
    .then((res) => res.json())
    .then((v) => {
      console.log('結果', v);
    });
}

export function* TestSaga() {
  yield takeEvery(TestActions.test.api.get, function* ({ payload }: ReturnType<typeof TestActions.test.api.get>) {
    const { str: _str, age: _age, remarks: _remarks } = payload.param;
    const str = _str ? `str=${_str}` : '';
    const age = _age ? `age=${_age}` : '';
    const remarks = _remarks ? `remarks=${_remarks}` : '';
  
    // -------------------------------------------------------------------
    yield fetch(`http://httpbin.org/get?${str}&${age}&${remarks}`)
      .then((res) => res.json())
      .then((v: Res<typeof payload.param>) => {
        if (payload.callback) {
          payload.callback(v.args)
          return
        }
        Store.dispatch(TestActions.test.set(v.args));
      });
  
    // // -------------------------------------------------------------------
    // const result: Res<typeof payload> = yield fetch(
    //   `http://httpbin.org/get?${str}&${age}&${remarks}`,
    // ).then((res) => res.json());
    // yield put(TestActions.test.set(result.args))
  });
  yield takeEvery(TestActions.test.api.post, tryTestPost);
  yield takeEvery(TestActions.test.api.delete, tryTestDelete);
}
