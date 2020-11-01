export const DRAG_NEXT = 'DRAG_NEXT'


export const dragNext = (direction, value) => {
    return {
        type: DRAG_NEXT,
        direction: direction,
        value: value,
    }
}
