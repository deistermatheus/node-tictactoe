class Board {
  constructor(){
     this._board = new Map();
  }
  
  setValue(position, player){
    this._board.set(position, player)
  }

  getValue(position){
    return this._board.get(position)
  }

  getNumberOfMoves(){
    return this._board.size
  }
};

export default Board;