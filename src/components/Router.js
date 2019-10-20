import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameContainer from '../containers/Game.container';

export default function App() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/Game">
              <GameContainer />
            </Route>
            <Route path="/Register">
              <GameContainer />
            </Route>
            <Route path="/">
              <GameContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}