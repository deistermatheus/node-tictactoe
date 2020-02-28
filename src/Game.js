import Board from './Board'
class Game{
  constructor(firstPlayer){
    this.board = new Board();
    this.turn = firstPlayer,
    this._winningCombos =  [ // Vertical
                           [{x:0, y:0},{x:0, y:1},{x:0, y:2}], 
                           [{x:1, y:0},{x:1, y:1},{x:1, y:2}], 
                           [{x:2, y:0},{x:2, y:1},{x:2, y:2}],
                           // Horizontal
                           [{x:0, y:0},{x:1, y:0},{x:2, y:0}], 
                           [{x:0, y:1},{x:1, y:1},{x:2, y:1}], 
                           [{x:0, y:2},{x:1, y:2},{x:2, y:2}],                           
                           // Diagonal
                           [{x:0, y:0},{x:1, y:1},{x:2, y:2}], 
                           [{x:0, y:2},{x:1, y:1},{x:2, y:0}]
                           ,];

    this.winner = undefined;
  }

    _checkForWinner(){
        const dropArrayDuplicates = array => Array.from(new Set(array))        
        
        const filledBoard = this._winningCombos
                                .map(arr => this._fillPositions(arr))
                                .filter(arr => arr.every(value => value !== undefined))
        console.log(this._winningCombos
          .map(arr => this._fillPositions(arr)));      
        /** winning condition, if any of the combos has only one value, winner
        *  is reached in this turn.
        */
        const hasWinner = filledBoard.map(arr => dropArrayDuplicates(arr))
                                     .some(arr => arr.length === 1)

        if(hasWinner){
          return this.turn
        }
        // Calculation did not return winner and board is full.
        if(!hasWinner && this.board.getNumberOfMoves() === 9){
          return 'Draw'
        }
        return
  }

  _fillPositions(comboArr){
    return comboArr.map(slot => this.board.getValue(JSON.stringify(slot)))
  }


  makeMove(player, position){
    this.board.setValue(JSON.stringify(position), player)
    this.winner = this._checkForWinner();
    this.turn === 'X' ? this.turn = 'O' : this.turn = 'X';
  } 
}

export default Game;