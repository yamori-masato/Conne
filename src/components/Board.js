import React from 'react'
import styled, { css } from "styled-components";

import {  } from '../actions'
import { connect } from 'react-redux'

import Square from './Square'
import Piece from './Piece';


const BoardStyle = styled.div(props => css`
    margin: 30px auto;
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-rows: repeat(10, 50px);
    grid-template-columns: repeat(10, 50px);
    /* border: solid 1px; */
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
    const code = board[y][x]
    return code !== 0 ? <Piece code={code}></Piece> : null
}


const Board = (props) => {
    const { board } = props
    const squares = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            squares.push(renderSquare(j,i,props.board))
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