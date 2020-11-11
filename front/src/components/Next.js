import React from 'react'
import styled, { css } from "styled-components";
import Piece from './Piece';

import { DragPreviewImage, useDrag } from 'react-dnd'
import { ItemTypes } from '../react-dnd/itemType'
import { getEmptyImage } from 'react-dnd-html5-backend';

import { dragNext } from '../actions'
import { connect } from 'react-redux'

const getNextStyles = (props, isDragging) => {
    const opacity = isDragging ? 0.3 : 1
    const direction = props.direction === 'row' ? 'row' : 'column'

    return {
        opacity: opacity,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        flexDirection: direction,
        width: '20%',
        height: '100%',
    }
}

const BlockStyle = styled.div(props => css`
    height: 50%;
    width: 50%;
    position: relative;
    border: solid 1px;
    box-sizing: border-box;
    background-color: white;
`)

const Block = (props) => {

    return (
        <BlockStyle >{props.children}</BlockStyle>
    )
}


const renderBlock = (props) => {
    // idは、縦向きは上下、横向きは左右の順で0~1
    let res = []
    for (let i = 0; i <= 1; i++) {
        res.push(
            <Block key={i} id={i} {...props}>
                <Piece code={props.value[i]}></Piece>
            </Block>
        )
    }
    return res
}



const Next = (props) => {
    
    const [{ isDragging }, ref, preview] = useDrag({
        item: { type: ItemTypes.NEXT },
        begin: (monitor)=>{props.dragNext(props.player, props.position)},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const dragRef = (props.player === 'your' && props.current) ? ref : null//

    return (
        <>
            <DragPreviewImage connect={preview} src={getEmptyImage().src}></DragPreviewImage>
            <div style={getNextStyles(props,isDragging)} ref={dragRef}>
                {renderBlock(props)}
            </div>
        </>
    )
}


function mapStateToProps(store) {
    return {
        current: store.game.current,
        ...store.next
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dragNext: (player, position) => { dispatch(dragNext(player, position)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Next)