import React from 'react'
import styled, { css } from "styled-components";
import Overlay from './Overlay'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../react-dnd/itemType'

import { dropNext } from '../actions'
import { connect } from 'react-redux'

// pieceとoverlay(dnd時のUI)を保持するコンポーネント

const SquareStyle = styled.div`
    position: relative;
    width: 12.5%;
    height: 12.5%;
    border: solid 1px;
    background-color: #fff;
`


const Square = (props) => {
    const {x,y} = props
    const { direction, value } = props.next.selectedNext
    const { board } = props.board

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.NEXT,  // itemオブジェクト
        drop: (item, monitor) => { props.dropNext(x,y,direction,value,board) }, // collect関数
        canDrop: (item, monitor) => true,
        collect: monitor => ({
            isOver: !!monitor.isOver(),   //hover
            canDrop: !!monitor.canDrop(),
        }),
	})

    return (
        <SquareStyle ref={drop}>
            {props.children}
			{isOver && !canDrop && <Overlay color="red" />}
			{/* {!isOver && canDrop && <Overlay color="yellow" />} */}
			{isOver && canDrop && <Overlay color="green" />}
        </SquareStyle>
    )
}


function mapStateToProps(store) {
    return store
}

function mapDispatchToProps(dispatch) {
    return {
        dropNext: (x,y,direction,value,board) => { dispatch(dropNext(x,y,direction,value,board)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
