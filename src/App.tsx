import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Game } from './pages/Game';
import { Home } from './pages/Home';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/game'>
          <Game />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
