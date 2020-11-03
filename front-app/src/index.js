import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {channel} from './channel'

export const ActionCableContext = React.createContext()
ReactDOM.render(
  <ActionCableContext.Provider value={channel}>
    <App />
  </ActionCableContext.Provider>,
  document.getElementById('root')
)
