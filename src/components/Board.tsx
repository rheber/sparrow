import React, {useState, useEffect} from 'react';
import { BoardSeat } from './BoardSeat';
import { generateTileset } from '../rules/tiles';
import { deal, Subround, Player } from '../rules/deal';

const Board: React.FunctionComponent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [subround, setSubround] = useState<Subround>({
    playerToAct: 0,
    seats: [],
    wall: [],
  });

  useEffect(() => {
    const tiles = generateTileset({ includeBonus: false });
    setSubround(deal(tiles));
    setPlayers([
      { id: 0, name: 'Inky' },
      { id: 1, name: 'Blinky' },
      { id: 2, name: 'Pinky' },
      { id: 3, name: 'Clyde' }
    ]);
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
