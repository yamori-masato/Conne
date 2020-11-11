import React from 'react'
import styled, { css } from 'styled-components'

const Img = styled.img(props => css`
    position: absolute;
    z-index: 100;
    width: 580px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s ease-out;
    opacity: ${ props.visible? 1 : 0 };
`)

class Result extends React.Component {
    state = { isVisible: false }
  
    componentDidMount() {
      setInterval(() => {
        this.setState({ isVisible: true })
      }, 2000)
    }
    
    render() {
        return (
            <Img visible={ this.state.isVisible } src={`${process.env.PUBLIC_URL}/SVG/${this.props.result}.svg`}></Img>
        )
    }
}

export default Result
