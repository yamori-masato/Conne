import React from 'react'
import styled, { css } from "styled-components";
import Overlay from './Overlay'
import gameBoard from '../gameLogic/board'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../react-dnd/itemType'

import { checkGameOver, dropNext } from '../actions'
import { connect } from 'react-redux'

import { ActionCableContext, store } from '../index'

// pieceとoverlay(dnd時のUI)を保持するコンポーネント

const SquareStyle = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: solid 1px;
    background-color: #fff;
`


const Square = (props) => {
    const {x,y} = props
    const { selectedNext, opp_next } = props.next
    const { board, highLightPos } = props.board
    let isHighLight = false
    // console.log(highLightPos)
    if (highLightPos.length) {
        isHighLight = !highLightPos.some(([i, j]) => (i === x && j === y)) // includesの値比較版
    }
    
    const channel = React.useContext(ActionCableContext).channel

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.NEXT,  // itemオブジェクト
        drop: (item, monitor) => {
            const curBoard = dropNext(x, y, board, selectedNext).board
            const { posData } = dropNext(x, y, board, selectedNext)
            props.dropNext(x, y, board, selectedNext)
            const {my_next} = store.getState().next
            props.checkGameOver(curBoard, posData, x, y, my_next, opp_next, channel) //-----------------------------------
        },
        canDrop: (item, monitor) => {
            const checkList = [x, y, board, selectedNext]
            const flag = checkList.every(v => (typeof v !== 'undefined'))
            if (flag) {
                const posData = dropNext(x, y, board, selectedNext).posData
                const current = new gameBoard(board)
                const result = current.canPut(...posData)

                return result
            } else {
                return false
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),   //hover
            canDrop: !!monitor.canDrop(),
        }),
	})

    return (
        <SquareStyle ref={drop}>
            {props.children}
			{isOver && !canDrop && <Overlay color="red" />}
			{/* {!isOver && canDrop && <Overlay color="yellow" />} */}
            {isOver && canDrop && <Overlay color="green" />}
            {isHighLight && <Overlay color="black" />}
        </SquareStyle>
    )
}


function mapStateToProps(store) {
    return store
}

function mapDispatchToProps(dispatch) {
    return {
        dropNext: (x, y, direction, value, board) => { dispatch(dropNext(x, y, direction, value, board)) },
        checkGameOver: (board, posData, x, y, my_next, opp_next, channel) => { dispatch(checkGameOver(board, posData, x, y, my_next, opp_next, channel))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
