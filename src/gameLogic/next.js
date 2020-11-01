const CODE_IDS = [1, 2, 3, 4]
const DIRECTION = ['row', 'column'] //タテヨコ

// CODE_IDSから2個ランダムに抽出して、ランダムにタテヨコも指定して、配列で返す ex) []
export const createNewCode = () => {
    const dir = DIRECTION[Math.floor(Math.random() * DIRECTION.length)]
    const ids = []
    while (ids.length !== 2) {
        const randId = CODE_IDS[Math.floor(Math.random() * CODE_IDS.length)]
        if (!ids.includes(randId)) {
            ids.push(randId)
        }
    }
    return [dir,ids]
}

