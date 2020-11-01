import React from 'react'
import styled, { css } from "styled-components";

import {  } from '../actions'
import { connect } from 'react-redux'

import Square from './Square'
import Piece from './Piece';


const BoardStyle = styled.div(props => css`
    margin: 30px auto;
    width: 400px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    border: solid 1px;
    background-color: aliceblue;
`)


const renderSquare = (x, y, board) => {
    return (
        <Square key={10 * x + y} x={x} y={y} >
            {renderPiece(x, y, board)}
        </Square>
    )
}

const renderPiece = (x, y, board) => {
    const code = board[x][y]
    return code !== 0 ? <Piece code={code}></Piece> : null
}


const Board = (props) => {
    const squares = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            squares.push(renderSquare(i,j,props.board))
        }
    }
    return (
        <BoardStyle>{squares}</BoardStyle>
    )
}



function mapStateToProps(store) {
    return store.board
}

function mapDispatchToProps(dispatch) {
    return {}
    // return {
    //     increment: () => { dispatch(increment()) },
    //     decrement: () => { dispatch(decrement()) },
    // }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Board)