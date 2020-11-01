import { DROP_NEXT } from '../actions'


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
    const newState = JSON.parse(JSON.stringify(state))
    // console.log(action)

    switch (action.type) {
        case DROP_NEXT:
            const newBoard = newState.board
            const posData = action.posData
            for (let i = 0; i <= 1; i++){
                let [value, pos] = posData[i]
                newBoard[pos[0]][pos[1]] = value
            }

            return {
                ...state,
                board: newBoard
             }

        default:
            return state
    }
}