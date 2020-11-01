import React from 'react'
import styled, { css } from "styled-components";

import {  } from '../actions'
import { connect } from 'react-redux'



const COLOR_CODE = {
    1: 'red',
    2: 'blue',
    3: 'yellow',
    4: 'green'
}

const PieceStyle = styled.div(props => css`
    position: absolute;
    width: 55%;
    height: 55%;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    border: solid 1px;
    background-color: ${COLOR_CODE[props.code]};
`)



const Piece = ({ code }) => {


    return <PieceStyle code={code} ></PieceStyle>
}






function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
    // return {
    //     increment: () => { dispatch(increment()) },
    //     decrement: () => { dispatch(decrement()) },
    // }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Piece)