import React from 'react'
import styled, { css } from "styled-components";
import Next from './Next'

import {  } from '../actions'
import { connect } from 'react-redux'

const NextListStyle = styled.div(props => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div:nth-child(2){
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`)

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    &:before{
        content:"";
        display: block;
        padding-top: 20%;
    }
`


const renderNext = (props) => {
    let nextList

    if (props.player === "your") {
        nextList = props.my_next
    } else
    if (props.player === "opponent") {
        nextList = props.opp_next
    }

    let res = []
    for (let i = 0; i <= 2; i++) {
        let [direction, value] = nextList[i]
        res.push(
            <Next
                key={i}
                direction={direction}
                value={value}
                player={props.player}
                position={i}                // 左中右の順で0~2
            >
            </Next>
        )
    }
    return res
}


const NextList = (props) => {
    return (
        <Wrapper>
            <NextListStyle>
                {renderNext(props)}
            </NextListStyle>
        </Wrapper>
    )
}


function mapStateToProps(store) {
    return {
        my_next: store.next.my_next,
        opp_next: store.next.opp_next,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
    // return {
    //     increment: () => { dispatch(increment()) },
    //     decrement: () => { dispatch(decrement()) },
    // }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(NextList)