import React from 'react'
import styled from "styled-components";

import Board from './Board'
import NextDragLayer from './NextDragLayer'
import NextList from './NextList'
import Result from '../components/Result'

import {shareInitData} from '../actions'
import { connect } from 'react-redux'

import { ActionCableContext } from '../index'

const Container = styled.div`
    width: 55vh;
    margin: 0 auto;
`



const Game = (props) => {
    const result = props.game.result
    const channel = React.useContext(ActionCableContext).channel
    React.useEffect(() => {
        if (props.game.order === 'first') {
            channel.send({type: "share_init" ,next: props.next})
        }
    }, [])
    
    return (
        <>  
            <NextDragLayer />
            {!!result && (
                <Result result={ result }/>
            )}

            <Container>
                <NextList player={"opponent"}></NextList>
                <Board/>
                <NextList player={"your"}></NextList>
            </Container>
        </>
    )
}


function mapStateToProps(store) {
    return store
}

function mapDispatchToProps(dispatch) {
    return {
        shareInitData: (next)=>{dispatch(shareInitData(next))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)