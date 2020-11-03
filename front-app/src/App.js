import React from 'react'
import {ActionCableContext} from './index'

const App = () => {
  const channel = React.useContext(ActionCableContext)
  return (
    <>
      <h1>Hello React App!!</h1>
    </>
  )
}

export default App