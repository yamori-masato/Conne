import React from 'react'
import Game from '../components/Game'

import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Game></Game>
    </DndProvider>
  )
}

export default App