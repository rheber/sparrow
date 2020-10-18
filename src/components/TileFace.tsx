import React from 'react';

export interface Props {
  /**
   * Whether to show the back of this tile rather than the front.
   */
  concealed: boolean;
};

const TileFace: React.FC<Props> = props => {
  if (props.concealed) {
    return (
      <img alt='back' src={`${process.env.PUBLIC_URL}/img/fluffyRegular/Back.svg`} />
    );
  }
  return (
    <img alt='ton' src={`${process.env.PUBLIC_URL}/img/fluffyRegular/Ton.svg`} />
  );
};

export { TileFace };
