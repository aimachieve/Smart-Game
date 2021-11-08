import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../admin/index';
import Play from '../player/Play';
import Win from '../player/Win';
import Lose from '../player/Lose';
import NotFound from '../layout/NotFound';

const Routes = props => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/play" component={Play} />
        <Route exact path="/win" component={Win} />
        <Route exact path="/lose" component={Lose} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
