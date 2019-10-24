import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameContainer from '../containers/Game.Container';
import LoginContainer from '../containers/Login.Container';
import RegisterContainer from '../containers/Register.Container';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/Register">
            <RegisterContainer />
          </Route>
          <Route path="/">
            <GameContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
