

class Board {
    constructor(board=[]) {
        this.board = JSON.parse(JSON.stringify(board)) 
        this.size = 10
        this.winNum = 4
    }

    initialBoard() {
        for (let i=0; i < this.size; i++){
            this.board.push([])
            for (let j = 0; j < this.size; j++){
                this.board[i].push(0)
            }
        }
        this.board[4][4] = 1
        this.board[4][5] = 2
        this.board[5][4] = 3
        this.board[5][5] = 4
        return this.board
    }


    // putPieceと_isEmptyでなぜかthis.boardがundefined扱いになるエラーがある
    // this.board自体を出力すると存在するのに、Uncaught TypeError: Cannot set property '0' of undefined


    // dataList={x:?, y:?, value:?},{x:?, y:?, value:?},{x:?, y:?, value:?},...
    canPut(...dataList) {
        return dataList.every(v => {
            const { x, y } = v
            if (x < 0 || 9 < x || y < 0 || 9 < y) { // 盤外
                return false
            }
            if (!this._isEmpty(x, y)) {             // 既にコマが置いてある
                return false
            }
            return true
        })   
    }

    putPiece(...dataList) {
        // dataList.forEach(v => {
        //     const { x, y, value } = v

        //     this.board[y][x] = value
        // })
        // return this.board
        const back =  JSON.parse(JSON.stringify(this.board)) // トランザクション
        try {
            dataList.forEach(v => {
                const { x, y, value } = v
    
                this.board[y][x] = value
            })
            return this.board
        } catch (error) {
            this.board = back
        }
    }

    checkGameOver(rowNext=true, columnNext=true) {
        // ①幅優先探索で4つ繋がっているかを確認
        // ②または、置ける場所がないか(引数で所持しているNextを考慮) ※今回は片方のプレイヤーが置けない状況が回ってきた時点でゲーム終了とする
        
        // ①勝利
        const clone = JSON.parse(JSON.stringify(this.board))
        const res = []
        const dir = [[0,1],[0,-1],[1,0],[-1,0]]      // 左上から右下へ探索するから [1,0],[-1,0]だけでいい気がする
        for (let i=0; i < this.size; i++){
            for (let j = 0; j < this.size; j++){

                if (clone[i][j] !== -1 && clone[i][j]!==0) {                          // 起点が探索済みでなければ
                    let queue = []
                    queue.push([j, i])                                 // 最初の探索場所は起点
                    let val = clone[i][j]                              // 起点の値
                    let index = 0
                    while (queue.length > index) {
                        const cur = queue[index]
                        let [x,y] = cur
                        clone[y][x] = -1
                        dir.forEach(([dx, dy]) => {
                            let [nx, ny] = [x + dx, y + dy]
                            if ( 0 <= nx && nx <= 9 && 0 <= ny && ny <= 9) {
                                if (clone[ny][nx] === val) {       // 起点の周囲で起点と同じ値なら探索場所に追加
                                    if ( !queue.some(([x,y])=>(x===nx && y===ny))) {   // [1,1]!==[1,1]だから
                                        queue.push([nx, ny])  
                                    }
                                }
                            }
                        })
                        index ++ 
                    }
                    if (index >= this.winNum) { res.push(queue) }
                }
            }
        }
        if (res.length) { return res }
        
        // ②引き分け
    }


    _isEmpty(x, y) {
        try {
            if (this.board[y][x] === 0) {
                return true
            }
            return false
        } catch (error) {
            return false
        }

        
    }



}






export default Board