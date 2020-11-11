import React from 'react';
import { useDragLayer } from 'react-dnd';
import styled, { css } from "styled-components";

import {  } from '../actions'
import { connect } from 'react-redux'

import Next from './Next'

const NextDragLayerStyle = styled.div(props => css`
    position: fixed;
    pointer-events: none;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${ !!props.result || props.current || 'rgba(0,0,0,0.5)'};
`)

// Nextコンポーネントは親要素の相対位置でサイズが決まるため、擬似的にNextListをつくっている。背景色付けてみるとわかりやすい。
const Wrapper = styled.div`
    width: calc(55vh);
    height: calc(55vh * 0.2);
    /* background-color: blue; */
`

const getItemStyles = (currentOffset,direction) => {
    if (!currentOffset) { //// 実際にドラッグしたやつをドロップする時
      return {
        display: 'none',
      };
    }
  
    const { x, y } = currentOffset;
    // text-align: center; の分ずらす。
    const dif_x = direction === 'row' ? 0 : 0.05
    const dif_y = direction === 'column' ? 0 : 0.05 
    // nextの左上の座標。
    const ox = `${x}px - 55vh * ${dif_x}`
    const oy = `${y}px - 55vh * ${dif_y}`
    // さらに一つ目のnextの中心までカーソルをずらす。
    const transform = `translate( calc(${ox} - 55vh * 0.05), calc(${oy} - 55vh * 0.05) )`;
    return {
        transform,
        WebkitTransform: transform,
        position: 'absolute',
    }
}


const NextDragLayer = (props) => {
    const { currentOffset, isDragging } = useDragLayer(monitor => ({
        // item: monitor.getItem(),
        // itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
        isDragging: monitor.isDragging(),
    }))
    const { direction, value } = props.selectedNext


    let draggingNext
    if (Object.keys(props.selectedNext).length) {
        draggingNext = props.selectedNext ? 
            <div style={getItemStyles(currentOffset, direction)}>
                <Wrapper>
                    <Next direction={direction} value={value} dragging={isDragging}/>
                </Wrapper>
            </div>
            : null
    }
    return (
        <NextDragLayerStyle current={props.current} result={props.result}>
            {draggingNext}
        </NextDragLayerStyle>
    )
    // return null


}



function mapStateToProps(store) {
    return {
        ...store.next,
        current: store.game.current,
        result: store.game.result,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}
    
export default connect(mapStateToProps, mapDispatchToProps)(NextDragLayer)