import { DRAG_NEXT } from '../actions'
import { createNewCode } from '../gameLogic/next'

const initialState = {
    my_next: [
        createNewCode(),
        createNewCode(),
        createNewCode(),
    ],
    opp_next: [
        createNewCode(),
        createNewCode(),
        createNewCode(),
    ],
    selectedNext: {}, // どのNextが選択されているか{player,position}

}

export default (state = initialState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case DRAG_NEXT:
            return { 
                ...newState,
                selectedNext: {
                    direction: action.direction,
                    value: action.value,
                }
            }
        default:
            return state
    }
}