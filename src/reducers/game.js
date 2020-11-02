export const CHECK_GAME_OVER = 'CHECK_GAME_OVER'

const initialState = {
    page: "game", // loading, title, game, result
    result: null,
    // result: null
}

export default (state = initialState, action) => {
    // const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case CHECK_GAME_OVER:
            return {
                ...state,
                page: action.page,
                result: action.result,
            }

        default:
            return state
    }
}