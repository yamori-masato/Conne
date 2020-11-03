import { SHARE_INIT_DATA ,DRAG_NEXT, DROP_NEXT, GAME_START } from '../actions'
import { createNewCode } from '../gameLogic/next'

const initialState = {
    my_next: [],
    opp_next: [],
    // my_next: [
    //     createNewCode(),
    //     createNewCode(),
    //     createNewCode(),
    // ],
    // opp_next: [
    //     createNewCode(),
    //     createNewCode(),
    //     createNewCode(),
    // ],
    selectedNext: {}, // どのNextが選択されているか{player,position}. 最後にドラッグされたもの

}

export default (state = initialState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    // console.log(state)

    let nexts,key
    if (action.player === "your") {
        nexts = newState.my_next
        key = "my_next"
    } else if (action.player === "opponent") {
        nexts = newState.opp_next
        key = "opp_next"
    }

    switch (action.type) {
        case GAME_START:
            return {
                ...newState,
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
            }
        case SHARE_INIT_DATA:
            return {
                ...state,
                my_next: action.my_next,
                opp_next: action.opp_next
            }

        case DRAG_NEXT:
            return { 
                ...newState,
                selectedNext: {
                    player: action.player,
                    position: action.position,
                    direction: nexts[action.position][0],
                    value: nexts[action.position][1],
                }
            }
        
        case DROP_NEXT:
            newState[key][action.position] = createNewCode()
            return {
                ...newState,
                selectedNext: {},
            }

            


        default:
            return state
    }
}