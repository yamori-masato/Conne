import { DROP_NEXT } from '../actions'
import Board from '../gameLogic/board'

const board = new Board

const initialState = {
    board: board.initialBoard()
}

export default (state = initialState, action) => {
    // const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case DROP_NEXT:
            return {
                ...state,
                board: action.board
            }

        default:
            return state
    }
}