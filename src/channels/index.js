
import { store } from '../index'
import { gameStart, gameEnd, shareInitData, move } from '../actions'

// channelから受信した時
const handleReceived = (data) => {
    console.log(data)
    let curBoard = store.getState().board.board

    switch (data.type) {
        case "game_start":
            store.dispatch(gameStart(data.order))
            break
        case "share_init":
            store.dispatch(shareInitData(data.next))
            break
        case "move":
            store.dispatch(move(curBoard, data.target, data.to, data.newNext))
            break
        case "end":
            store.dispatch(move(curBoard, data.target, data.to, data.newNext))
            store.dispatch(gameEnd(store.getState().board.board, store.getState().next.opp_next))
            
            break
        default:
            break
    }
}

const handleConnected = () => {
    console.log('waiting...')
}

const handleDisconnected = () => {
}


export const subscribeGameChannel = (cable) => {
    cable.channel = cable.subscriptions.create({ channel: "GameChannel" }, {
        received: handleReceived,
        connected: handleConnected,
        disconnected: handleDisconnected,
    })

}