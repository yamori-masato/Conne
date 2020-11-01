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
`)

const getItemStyles = (currentOffset) => {
    if (!currentOffset) { // 実際にドラッグしたやつをドロップする時
      return {
        display: 'none',
      };
    }
  
    const { x, y } = currentOffset;
  
    const transform = `translate( calc(${x}px - 400px * 0.125 / 2), calc(${y}px - 400px * 0.125 / 2) )`;
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
    // console.log(isDragging)

    let draggingNext
    if (Object.keys(props.selectedNext).length) {
        const { direction, value } = props.selectedNext
        draggingNext = props.selectedNext ? 
            <Next direction={direction} value={value} dragging={isDragging}></Next>
            : null
    }

    return (
        <NextDragLayerStyle>
            <div style={getItemStyles(currentOffset)}>
                {draggingNext}
            </div>
        </NextDragLayerStyle>
    )
    // return null


}



function mapStateToProps(store) {
    return store.next
}

function mapDispatchToProps(dispatch) {
    return {}
    // return {
    //     increment: () => { dispatch(increment()) },
    //     decrement: () => { dispatch(decrement()) },
    // }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(NextDragLayer)