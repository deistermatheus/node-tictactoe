import Board from './Board'
import Game from './Game'
class GameStorage{
  constructor(){
    this._games = {}
  };

  newGame(id, firstPlayer){
    this._games[id] = new Game(firstPlayer);
    console.log(this._games);
  }

  deleteGame(id){
    delete this._games[id];
  }

  gameExists(id){
    return Object.keys(this._games).includes(id)
  }

  getGame(id){
    return this._games[id];
  }
}

export default GameStorage;