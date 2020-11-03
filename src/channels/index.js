
import { store} from '../index'
import { gameStart, shareInitData } from '../actions'


// channelから受信した時
const handleReceived = (data) => {
    console.log(data)
    switch (data.type) {
        case "game_start":
            store.dispatch(gameStart(data.order))
            break
        case "share_init":
            // console.log(data.next)
            store.dispatch(shareInitData(data.next))
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