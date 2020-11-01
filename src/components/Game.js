import React from 'react'

import Board from './Board'
import NextDragLayer from './NextDragLayer'
import NextList from './NextList'


const Game = (props) => {
    return (
        <>  
            <NextDragLayer></NextDragLayer>
            <NextList player={"opponent"}></NextList>
            <Board></Board>
            <NextList player={"your"}></NextList>
        </>
    )
}


export default Game