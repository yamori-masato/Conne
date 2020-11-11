import React from 'react'
import styled, { css } from "styled-components";

import {  } from '../actions'
import { connect } from 'react-redux'

import Square from './Square'
import Piece from './Piece';


const BoardStyle = styled.div(props => css`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-rows: repeat(10, 10%);
    grid-template-columns: repeat(10, 10%);
    position: absolute;
`)

const BoardBackGround = styled.div`
    position: absolute;
    height: 107%;
    width: 107%;
    border-radius: 19px;
    background-color: #f2f2f2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 3px 3px 13px #bfbfbf;
`

const Wrapper = styled.div(props => css`
    position: relative;
    width: 100%;
    margin: 10% 0;

    &:before{
        content:"";
        display: block;
        padding-top: 100%;
    }
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
        <Wrapper>
            <BoardStyle>
                <BoardBackGround/>
                {squares}
            </BoardStyle>
        </Wrapper>
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