import express from "express";
import GameStorage from './GameStorage';
import crypto from "crypto";
/** Setup basic server
 *  For API Tests, see sample Postman file.
 */
const server = express();
server.use(express.json());
server.listen(3333);
/** Middlewares */
const checkGameExists = (req, res, next) => {
  const { id } = req.params;
  if(!gameStorage.gameExists(id)){
    return res.status(404).json({message: `Game ID: ${id} not found.`})
  }
  return next();
};

const checkValidMove = (req, res, next) => {
  const { id } = req.params;
  const { player, position } = req.body;
  const { x, y } = position;
  const game = gameStorage.getGame(id);
  const withinRange = coordinate => coordinate >= 0 && coordinate <= 2
  if(game.turn !== player){
    return res.status(400).json({message: `This is not player ${player}'s turn.`})
  }
  if(!(withinRange(x) & withinRange(y))){
    return res.status(400).json({message: `Move: x = ${x}, y = ${y} out of bounds`})
  }

  return next()
}

const checkGameHasWinner = (req, res, next) => {
  const { id } = req.params;
  const game = gameStorage.getGame(id);
  if(game.winner){
    return res.status(400).json({message: `Game is over. Result is: ${game.winner}`})
  }
  return next();
}

const gameStorage = new GameStorage();
server.get('/', (req, res ) =>{
  return res.json({message: "App is running."})
});

/** CRUD methods 
 * 
 */
server.post('/game', (req, res) => {
  const player = Math.random() > 0.5 ? 'X' : 'O'
  const id = crypto.randomBytes(8).toString('hex')
  gameStorage.newGame(id, player);
  return res.status(200).json({message: `New game created`, id: id});
});

server.post('/game/:id/movement', checkGameExists, checkGameHasWinner, checkValidMove, (req, res) => {
  const { player, position } = req.body;
  const { x, y } = position;
  const { id } = req.params;
  const game = gameStorage.getGame(id);
  game.makeMove(player, position);
  if(game.winner){
    return res.status(200).json({message:`Game over. Result: ${game.winner}`})
  }
  return res.status(200)
            .json({message: `Moved ${player} to position: x = ${x} y = ${y}`})
});

server.delete('/game/:id', checkGameExists, (req, res) => {
  const { id } = req.params;
  gameStorage.deleteGame(id);
  return res.status(200).json({message: `Game id: ${id} deleted.`});
})