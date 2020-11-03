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

export const checkGameOver = (curBoard, opp_next) => {
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
    let page = 'game'
    switch (result) {
        case "ok": // game続行)
            break
        case "win":
            highLightPos = data.pos
            break
    }

    return {
        type: CHECK_GAME_OVER,
        result: result,
        highLightPos: highLightPos,
    }
}






// actionCable

// export const RECEIVED = 'RECEIVED'

export const GAME_START = 'GAME_START'
export const GAME_END = 'GAME_END'



export const receive = (data) => {
    // dataによってtypeを分岐

    return {
        // boardReducerのboardを初期化
        // nextReducerを初期化
        // gameReducerの
        type: GAME_START,
    }
    return {
        type: GAME_END,
    }
}
