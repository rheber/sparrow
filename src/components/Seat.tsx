import React from 'react';
import {DiscardPile, Hand, Player} from '../rules/deal';
import {AsciiTile} from './AsciiTile';

const Seat: React.FunctionComponent<{
  discardPile: DiscardPile;
  hand: Hand;
  player: Player;
}> = props => {
  return (
    <div>
      {props.player.name}
      {props.discardPile.map(tile => <AsciiTile tile={tile} />)}
      {props.hand.concealed.map(() => 'X')}
    </div>
  );
};

export { Seat };
