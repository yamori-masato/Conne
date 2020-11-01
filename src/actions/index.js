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
export const dropNext = (toX, toY, direction, value, board) => {
    // console.log(toX, toY, direction, value, board)
    let setX,setY
    if (direction==="row") {
        [setX, setY] = [toX,toY+1]
    } else if (direction === "column") {
        [setX, setY] = [toX+1,toY]
    }
    const posData = [
        [value[0], [toX, toY]],
        [value[1], [setX, setY]]
    ]
    
    return {
        type: DROP_NEXT,
        posData: posData,
        board: board,
    }
}