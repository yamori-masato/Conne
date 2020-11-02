import React from 'react'
import Game from '../components/Game'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { } from '../actions'
import { connect } from 'react-redux'

const App = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {props.page === 'title' && (
        <h1>game start!</h1>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)