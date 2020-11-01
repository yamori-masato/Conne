import { } from '../actions'

const initialState = {
    board: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,3,4,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case CAN_MOVE:
        //     return { value: state.value + 1 }
        // case DECREMENT:
        //     return { value: state.value - 1 }
        default:
            return state
    }
}