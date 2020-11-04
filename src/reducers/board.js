import { DROP_NEXT, GAME_START, CHECK_GAME_OVER, MOVE, GAME_END } from '../actions'
import Board from '../gameLogic/board'

const board = new Board

const initialState = {
    // board: board.initialBoard()

    board: null,
    highLightPos: [],   // 終了時、結果に関係するマス

}

export default (state = initialState, action) => {
    // const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GAME_START:
            return {
                ...state,
                board: board.initialBoard()
            }
        
        case DROP_NEXT:
            return {
                ...state,
                board: action.board
            }
        
                
        case CHECK_GAME_OVER:
            return {
                ...state,
                highLightPos: action.highLightPos,
            }
        
        case MOVE:
            return {
                ...state,
                board: action.newBoard,
            }
        
        case GAME_END:
            return {
                ...state,
                highLightPos: action.highLightPos,
            }

        default:
            return state
    }
}