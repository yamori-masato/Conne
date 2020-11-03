import actionCable from 'actioncable'
import { API_WS_ROOT } from '../constants'


// channelから受信した時
const handleReceived = (data) => {
    console.log(data)
    switch (data.action) {
        case "game_start":
            alert(data.msg)
            break
        default:
            alert(data.msg)
    }
}

const handleConnected = () => {
    console.log('waiting...')
}

const handleDisconnected = () => {
}



const CableApp = {}
CableApp.cable = actionCable.createConsumer(API_WS_ROOT)

export const channel = CableApp.cable.subscriptions.create({ channel: "GameChannel" }, {
    received: handleReceived,
    connected: handleConnected,
    disconnected: handleDisconnected,

})



// 送信はできるけど、受信ができない？？