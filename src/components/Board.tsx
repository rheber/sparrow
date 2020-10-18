import React, {useState, useEffect} from 'react';
import { BoardSeat } from './BoardSeat';
import { Subround } from '../rules/subround';
import { Player, GreedyAiPlayer } from '../rules/player';

const Board: React.FunctionComponent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [subround, setSubround] = useState<null | Subround>(null);

  useEffect(() => {
    const newSubround = new Subround();
    setPlayers([
      new GreedyAiPlayer('Inky', 0),
      new GreedyAiPlayer('Blinky', 1),
      new GreedyAiPlayer('Pinky', 2),
      new GreedyAiPlayer('Clyde', 3),
    ]);
    newSubround.draw();
    setSubround(newSubround);
  }, []);

  if (!subround) {
    return null;
  }

  return (
    <div>
      {players.map(player => (
        <BoardSeat
          seat={subround.seats[player.id]}
          player={player}
        />
      ))}
      <div>Tiles left: {subround.wall.length}</div>
      {subround.wall.map(() => 'X')}
    </div>
  );

};

export { Board };
