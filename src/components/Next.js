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
    const display = props.direction === 'row' ? 'flex' : 'block'

    return {
        opacity: opacity,
        display: display,
        // position: 'relative',

    }
}

const BlockStyle = styled.div(props => css`
    height: calc(400px * 0.125);
    width: calc(400px * 0.125);
    position: relative;
    border: solid 1px;

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

    // console.log(props.selectedNext)


    return (        
        <>
        <DragPreviewImage connect={preview} src={getEmptyImage().src}></DragPreviewImage>

        {/* <NextStyle direction={direction} dragging={isDragging} ref={ref} >
            {renderBlock(props)}
        </NextStyle> */}
            
            <div style={getNextStyles(props,isDragging)} ref={ref}>
                {renderBlock(props)}
            </div>
        </>
    )
}


function mapStateToProps(store) {
    return store.next
}

function mapDispatchToProps(dispatch) {
    return {
        dragNext: (player, position) => { dispatch(dragNext(player, position)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Next)