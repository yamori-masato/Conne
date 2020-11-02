import React from 'react'
import Game from '../components/Game'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { received } from '../actions'
import { connect } from 'react-redux'

const handleClick = (props) => {
  props.received()
}

const App = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {props.page === 'loading' && (
        <>
          <h1>game start!</h1>
          <button onClick={() => { handleClick(props) }} style={{width: '100px', height: '50px'}}></button>
        </>
      )}
      {props.page === 'game' && (
        <Game></Game>        
      )}
      {props.page === 'result' && (
        <h1>you win!</h1>
      )}
    </DndProvider>
  )
}



function mapStateToProps(store) {
    return store.game
}

function mapDispatchToProps(dispatch) {
  return {
      received: ()=>{ dispatch(received('hello')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)