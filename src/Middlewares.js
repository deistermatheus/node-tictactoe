export const checkGameExists = (req, res, next) => {
  const { id } = req.params;
  if(!gameStorage.gameExists(id)){
    return res.status(404).json({message: 'Game ID not found.'})
  }
  return next()
};

export const checkValidMove = (req, res, next) => {
  const { position, player } = req.body;
  const id = req.params;
  const {x, y} = position;
  const isWithinRange = (coord) => coord >= 0 && coord <= 2
  if(!isWithinRange(x) || !isWithinRange(y)){
    return res.status(400).json({message: 'Board coordinates must be in range [0,2]'})
  }
  const game = gameStorage.getGame(id);
  if(game.board.getValue(position)){
    return res.status(400).json({message: 'Board position is already filled'})
  }
  return next()
}

export const checkGameHasWinner = (req, res, next) => {
  const game = gameStorage.getGame(id);
  if(game.hasWinner){
    return res.status(400).json({message: `Game is over. Result is: ${game.getWinner}`})
  }
}

