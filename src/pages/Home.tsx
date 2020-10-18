import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <Link to='/game'>Create Game</Link>
      </div>
      <div>
        Tile images by <a href='https://github.com/FluffyStuff/riichi-mahjong-tiles'>FluffyStuff</a> used under <a href='http://creativecommons.org/licenses/by/4.0/'>Creative Commons Attribution 4.0 International License</a>.
      </div>
    </div>
  );
};

export { Home };
