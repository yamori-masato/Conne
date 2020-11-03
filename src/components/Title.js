import React from 'react'
import { ActionCableContext } from '../index'

import { seek } from '../actions'
import { connect } from 'react-redux'

import styled, { css } from "styled-components";

const ButtonStyle = styled.button`
    color: #fff;
    background-color: #eb6100;
    border-radius: 100vh;
    width: 100px;
    height: 55px;
    margin: 0 auto;
    box-shadow: 1px 1px 2px black;

    border: none;
    cursor: pointer;
    outline: none;

    &:hover{
        color: #fff;
        background: #f56500;
    }
`

const handleClick = (props,cable) => {
    props.seek(cable)
}

const Title = (props) => {
    const { waiting } = props
    const cable = React.useContext(ActionCableContext)

    return (
        <>
            <ButtonStyle onClick={() => { handleClick(props,cable) }}>START!</ButtonStyle>
            {waiting && (
                <p style={{textAlign: 'center', marginTop: '10px'}}>loading...</p>
            )}
        </>
    )
}


function mapStateToProps(store) {
    return store.game
}

function mapDispatchToProps(dispatch) {
  return {
      seek: (cable)=>{ dispatch(seek(cable)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title)