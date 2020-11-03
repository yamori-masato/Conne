import React from 'react'

import Board from './Board'
import NextDragLayer from './NextDragLayer'
import NextList from './NextList'

import {shareInitData} from '../actions'
import { connect } from 'react-redux'

import { ActionCableContext } from '../index'

const Game = (props) => {
    const channel = React.useContext(ActionCableContext).channel
    React.useEffect(() => {
        console.log(props.game.order)
        if (props.game.order === 'first') {
            channel.send({type: "share_init" ,next: props.next})
        }
    }, [])
    
    return (
        <>  
            <NextDragLayer></NextDragLayer>
            <NextList player={"opponent"}></NextList>
            <Board></Board>
            <NextList player={"your"}></NextList>
        </>
    )
}


// class Game extends React.Component{

    

//     render() {
//         return (
//             <>  
//                 <NextDragLayer></NextDragLayer>
//                 <NextList player={"opponent"}></NextList>
//                 <Board></Board>
//                 <NextList player={"your"}></NextList>
//             </>
//         )
//     }
// }


function mapStateToProps(store) {
    return store
}

function mapDispatchToProps(dispatch) {
    return {
        shareInitData: (next)=>{dispatch(shareInitData(next))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)