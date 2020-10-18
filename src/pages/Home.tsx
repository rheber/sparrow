import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FunctionComponent = () => {
  return (
    <Link to='/game'>Create Game</Link>
  );
};

export { Home };
