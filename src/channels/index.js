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


export const subscribeGameChannel = (cable) => {
    cable.subscriptions.create({ channel: "GameChannel" }, {
        received: handleReceived,
        connected: handleConnected,
        disconnected: handleDisconnected,
    })

}