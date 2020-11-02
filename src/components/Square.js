import React from 'react'
import styled, { css } from "styled-components";
import Overlay from './Overlay'
import gameBoard from '../gameLogic/board'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../react-dnd/itemType'

import { checkGameOver, dropNext } from '../actions'
import { connect } from 'react-redux'

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
    const selectedNext = props.next.selectedNext
    const { board } = props.board
    const { next } = props.next

    // console.log(x, y, direction, value, board)

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.NEXT,  // itemオブジェクト
        drop: (item, monitor) => {
            const curBoard = dropNext(x, y, board, selectedNext).board
            props.dropNext(x, y, board, selectedNext)
            props.checkGameOver(curBoard)
        }, // collect関数
        // ここは絶対state経由で参照したほうが良い
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
        </SquareStyle>
    )
}


function mapStateToProps(store) {
    return store
}

function mapDispatchToProps(dispatch) {
    return {
        dropNext: (x, y, direction, value, board) => { dispatch(dropNext(x, y, direction, value, board)) },
        checkGameOver: (board) => { dispatch(checkGameOver(board))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
