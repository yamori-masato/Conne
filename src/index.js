import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'    // storeの作成モジュール
import { Provider } from 'react-redux' // 作成したstoreを全コンポーネントで利用可能にするモジュール
import App from './components/App';
import reducer from './reducers/'
import actionCable from 'actioncable'
import { API_WS_ROOT } from './constants'

const store = createStore(reducer)     // reducerを元にstoreを作成


const CableApp = {}
CableApp.cable = actionCable.createConsumer(API_WS_ROOT) // socketクライアント
export const ActionCableContext = React.createContext()

ReactDOM.render(
  <Provider store={store}>
    <ActionCableContext.Provider value={CableApp.cable}>
      <App />
    </ActionCableContext.Provider>
  </Provider>,
  document.getElementById('root')
)