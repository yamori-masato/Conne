import { combineReducers } from 'redux'
import board from './board'
import next from './next'
import game from './game'


export default combineReducers({ board, next, game })