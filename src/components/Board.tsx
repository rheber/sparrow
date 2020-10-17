import React, {useState, useEffect} from 'react';
import { Seat } from './Seat';
import { generateTileset } from '../rules/tiles';
import { deal, Subround, Player } from '../rules/deal';

const Board: React.FunctionComponent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [subround, setSubround] = useState<Subround>({
    discardPiles: [],
    hands: [],
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
        <Seat
          discardPile={subround.discardPiles[player.id]}
          hand={subround.hands[player.id]}
          player={player}
        />
      ))}
      {subround.wall.map(() => 'X')}
    </div>
  );

};

export { Board };
