import React from 'react';
import {Tile, tileName} from '../rules/tile';

const AsciiTile: React.FunctionComponent<{
  tile: Tile,
}> = props => {

  return (
    <div>
      {tileName(props.tile)}
    </div>
  );
};

export { AsciiTile };
