import React from 'react';
import {Player, Seat} from '../rules/deal';
import {AsciiTile} from './AsciiTile';

const BoardSeat: React.FunctionComponent<{
  seat: Seat,
  player: Player;
}> = props => {
  return (
    <div>
      {props.player.name}
      {props.seat.discardPile.map(tile => <AsciiTile tile={tile} />)}
      {props.seat.hand.concealed.map(() => 'X')}
    </div>
  );
};

export { BoardSeat };
