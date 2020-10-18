import React from 'react';

const TileFace: React.FunctionComponent<{
  concealed: boolean;
}> = props => {
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
