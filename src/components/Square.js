import React from 'react'
import styled, { css } from "styled-components";
import Overlay from './Overlay'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../react-dnd/itemType'



// pieceとoverlay(dnd時のUI)を保持するコンポーネント

const SquareStyle = styled.div`
    position: relative;
    width: 12.5%;
    height: 12.5%;
    border: solid 1px;
    background-color: #fff;
`


const Square = ({ x, y, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.NEXT,     // itemオブジェクト
        drop: () => {}, // collect関数
        canDrop: () => true,
        collect: monitor => ({
            isOver: !!monitor.isOver(),   //hover
            canDrop: !!monitor.canDrop(),
        }),
	})

    return (
        <SquareStyle ref={drop}>
            {children}
			{isOver && !canDrop && <Overlay color="red" />}
			{/* {!isOver && canDrop && <Overlay color="yellow" />} */}
			{isOver && canDrop && <Overlay color="green" />}
        </SquareStyle>
    )
}
export default Square