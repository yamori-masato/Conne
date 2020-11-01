import Board from '../gameLogic/board'

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
export const dropNext = (toX, toY, direction, value, before) => {
    // console.log(toX, toY, direction, value, board)
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
        posData: posData,    // View側用
    }
}