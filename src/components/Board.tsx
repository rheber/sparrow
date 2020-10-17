import React, {useState, useEffect} from 'react';
import { AsciiTile } from './AsciiTile';
import { generateTileset } from '../rules/tiles';
import { deal, Subround } from '../rules/deal';

const Board: React.FunctionComponent = () => {
  const [subround, setSubround] = useState<Subround>({
    discardPiles: [],
    hands: [],
    wall: [],
  });

  useEffect(() => {
    const tiles = generateTileset({ includeBonus: false });
    setSubround(deal(tiles));
  }, []);

  return (
    <div>
      {subround.wall.map(tile => <AsciiTile tile={tile} />)}
    </div>
  );

};

export { Board };
