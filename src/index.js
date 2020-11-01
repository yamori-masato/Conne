import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'    // storeの作成モジュール
import { Provider } from 'react-redux' // 作成したstoreを全コンポーネントで利用可能にするモジュール
import App from './components/App';
import reducer from './reducers/'

const store = createStore(reducer)     // reducerを元にstoreを作成

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)