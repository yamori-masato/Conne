import { SEEK, GAME_START, CHECK_GAME_OVER } from '../actions'

const initialState = {
    page: "title", // title, game, result
    waiting: false,  // 対戦相手待ちかどうか
    order: null,  // first second
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
                // order: ?,
            }
        
        
        case CHECK_GAME_OVER:
            return {
                ...state,
                result: action.result,
            }

        default:
            return state
    }
}