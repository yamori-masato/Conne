import Board from '../gameLogic/board'
import { subscribeGameChannel } from '../channels'


export const SEEK = 'SEEK'
export const DRAG_NEXT = 'DRAG_NEXT'
export const DROP_NEXT = 'DROP_NEXT'
export const CHECK_GAME_OVER = 'CHECK_GAME_OVER'

// 対戦を待機する
export const seek = (cable) => {
    // gameChannelをsubscribeする
    subscribeGameChannel(cable)
    return {
        type: SEEK,
    }
}


export const dragNext = (player, position) => {
    return {
        type: DRAG_NEXT,
        player: player,
        position: position,
    }
}

// nextとboardの両方にdispatch
export const dropNext = (toX, toY, before, selectedNext) => {
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

export const checkGameOver = (curBoard, posData, x, y, my_next, opp_next, channel) => {
    let rowNext = false
    let columnNext = false
    opp_next.forEach(([dir,]) => {
        if (dir === 'row') {
            rowNext = true
        } else if (dir === 'column') {
            columnNext = true
        }
    })
    const current = new Board(curBoard)
    const data = current.checkGameOver(rowNext, columnNext)
    const result = data.result
    let highLightPos = []
    switch (result) {
        case "ok": // game続行
            channel.send({
                type: 'move',
                target: posData,
                to: { x: x, y: y },
                newNext: my_next
            })
            break
        case "win":
            highLightPos = data.pos
            channel.send({
                type: 'end',
                target: posData,
                to: { x: x, y: y },
                newNext: my_next
            })
            break
    }

    return {
        type: CHECK_GAME_OVER,
        result: result,
        highLightPos: highLightPos,
    }
}



// actionCable

export const RECEIVED = 'RECEIVED'
export const GAME_START = 'GAME_START'
export const SHARE_INIT_DATA = 'SHARE_INIT_DATA'
export const MOVE = 'MOVE'

export const GAME_END = 'GAME_END'



export const gameStart = (order) => {
    return {
        type: GAME_START,
        order: order,
    }
}
export const shareInitData = (next) => {
    const [my_next, opp_next] = [next.opp_next, next.my_next]
    return {
        type: SHARE_INIT_DATA,
        my_next,
        opp_next,
    }
}
export const move = (posData, target, to, newNext) => {
    // boardを返したい
    
    const board = new Board(posData)
    const newBoard = board.putPiece(...target)

    return {
        type: MOVE,
        newBoard: newBoard,
        newNext: newNext,
    }
}

export const gameEnd = (curBoard, opp_next) => {
    console.log('channel')
    console.log(curBoard)
    console.log(opp_next)


    let rowNext = false
    let columnNext = false
    opp_next.forEach(([dir,]) => {
        if (dir === 'row') {
            rowNext = true
        } else if (dir === 'column') {
            columnNext = true
        }
    })
    const current = new Board(curBoard)
    const data = current.checkGameOver(rowNext, columnNext)
    const highLightPos = data.pos


    return {
        type: GAME_END,
        highLightPos: highLightPos,
    }
}