import { DRAG_NEXT, DROP_NEXT } from '../actions'
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
    selectedNext: {}, // どのNextが選択されているか{player,position}. 最後にドラッグされたもの

}

export default (state = initialState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    // console.log(state)

    switch (action.type) {
        case DRAG_NEXT:
            const { player, position } = action

            let nexts
            if (player === "your") {
                nexts = state.my_next
            } else if (player === "opponent") {
                nexts = state.opp_next
            }

            return { 
                ...newState,
                selectedNext: {
                    player: player,
                    position: position,
                    direction: nexts[position][0],
                    value: nexts[position][1],
                }
            }
        
        case DROP_NEXT:
            return {
                ...newState,
                selectedNext: {},
            }

            


        default:
            return state
    }
}