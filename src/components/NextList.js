import React from 'react'
import styled, { css } from "styled-components";
import Next from './Next'

import {  } from '../actions'
import { connect } from 'react-redux'

const NextListStyle = styled.div(props => css`
    position: relative;
    width: 400px;
    height: calc(400px * 0.25); // これはなくても動くはずだが、子要素に依存したサイズにしてしまうとバグで高さが変わってしまう。

    margin: 0 auto;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`)


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
        <NextListStyle>
            {renderNext(props)}
        </NextListStyle>
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