import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { TestActions } from './test/test.action';
import { State } from './root.reducer';

function App() {
  const dispatch = useDispatch();
  const test = useSelector((state: State) => state.test);

  const [str, setStr] = useState('');
  const [age, setAge] = useState('');
  const [remarks, setRemarks] = useState('');

  const onClickBtn = useCallback(
    (mode: 'GET' | 'POST' | 'DELETE') => {
      if (mode === 'GET') {
        dispatch(
          TestActions.test.api.get({
            param: {
              str,
              age,
              remarks,
            },
          }),
        );
      }
      if (mode === 'POST') {
        dispatch(
          TestActions.test.api.post({
            str: 'テスト',
            age: '11111',
            remarks: 'テストテストテストテストテストテストテストテスト',
          }),
        );
      }
      if (mode === 'DELETE') {
        dispatch(TestActions.test.api.delete());
      }
    },
    [dispatch, str, age, remarks],
  );

  useEffect(() => {
    setStr(test.str);
    setAge(test.age);
    setRemarks(test.remarks);
  }, [test]);

  return (
    <div className="App">
      <div
        onKeyPress={(e) => {
          if (e.key === 'Enter') onClickBtn('GET');
        }}
      >
        <input value={str} onChange={({ target }) => setStr(target.value)} />
        <input value={age} onChange={({ target }) => setAge(target.value)} />
        <input
          value={remarks}
          onChange={({ target }) => setRemarks(target.value)}
        />
      </div>
      <div>
        <button onClick={() => onClickBtn('GET')}>GETテストだよー</button>
        <button onClick={() => onClickBtn('POST')}>POSTテストだよー</button>
        <button onClick={() => onClickBtn('DELETE')}>DELETEテストだよー</button>
      </div>
      {test.age && (
        <div>
          名前: {test.str}
          年齢: {test.age}
          備考: {test.remarks}
        </div>
      )}
    </div>
  );
}

export default App;
