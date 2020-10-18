import React, {useState, useEffect} from 'react';
import { BoardSeat } from './BoardSeat';
import { generateTileset } from '../rules/tiles';
import { deal, Subround, draw } from '../rules/deal';
import { Player, GreedyAiPlayer } from '../rules/player';

const Board: React.FunctionComponent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [subround, setSubround] = useState<Subround>({
    playerToAct: 0,
    seats: [],
    wall: [],
  });

  useEffect(() => {
    const tiles = generateTileset({ includeBonus: false });
    const newSubround = deal(tiles);
    setPlayers([
      new GreedyAiPlayer('Inky', 0),
      new GreedyAiPlayer('Blinky', 1),
      new GreedyAiPlayer('Pinky', 2),
      new GreedyAiPlayer('Clyde', 3),
    ]);
    draw(newSubround);
    setSubround(newSubround);
  }, []);

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
