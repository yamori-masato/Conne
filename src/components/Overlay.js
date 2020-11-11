import React from 'react'
// import styled, { css } from 'styled-components'

// const OverlayStyle = styled.div(props => css`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	height: 100%;
// 	width: 100%;
// 	z-index: 1;
// 	opacity: 0.5;
// 	background-color: ${ props.color };
// `)

const getOverlayStyles = (color) => {
	return {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		zIndex: 1,
		opacity: 0.5,
		backgroundColor: color,
	}
}


const Overlay = ({ color }) => {
	return (
		<div style={getOverlayStyles(color)}></div>
		//<OverlayStyle color={color}　/>
	)
}
export default Overlay
