import Board from '../gameLogic/board'
import { createNewCode } from '../gameLogic/next'


export const DRAG_NEXT = 'DRAG_NEXT'
export const DROP_NEXT = 'DROP_NEXT'



export const dragNext = (player, position) => {
    // if (!player || !position) {
    //     return {type: null}
    // }
    return {
        type: DRAG_NEXT,
        player: player,
        position: position,
    }
}

// nextとboardの両方にdispatch
export const dropNext = (toX, toY, before, selectedNext) => {
    // console.log(toX, toY, board, selectedNext)
    const {direction, value, player, position} = selectedNext
    let setX,setY
    if (direction==="row") {
        [setX, setY] = [toX+1,toY]
    } else if (direction === "column") {
        [setX, setY] = [toX,toY+1]
    }

    const posData = [
        { value: value[0], x: toX, y: toY },
        { value: value[1], x: setX, y: setY },
    ]
    const board = new Board(before)
    const newBoard = board.putPiece(...posData)
 
    return {
        type: DROP_NEXT,
        board: newBoard,
        player: player,
        position: position,
        posData: posData,    // View側用
    }
}