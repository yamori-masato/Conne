import { SEEK, GAME_START, SHARE_INIT_DATA, CHECK_GAME_OVER, MOVE, GAME_END } from '../actions'

const initialState = {
    page: "title", // title, game, result
    waiting: false,  // 対戦相手待ちかどうか
    order: null,  // first second
    current: false, // 操作権
    result: null, // win lose
}

export default (state = initialState, action) => {
    // const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case SEEK:
            return {
                ...state,
                waiting: true,
            }
        
        case GAME_START:
            return {
                ...state,
                page: "game",
                order: action.order,
            }
        
        case SHARE_INIT_DATA:
            return {
                ...state,
                current: true,
            }
        
        
        case CHECK_GAME_OVER:
            return {
                ...state,
                result: action.result,
                current: false,
            }
        
        case MOVE:
            return {
                ...state,
                current: true,
            }
        
        case GAME_END:
            return {
                ...state,
                current: false,
            }

        default:
            return state
    }
}