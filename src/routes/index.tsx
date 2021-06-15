import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Editar from '../pages/editar';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/editar/:id" component={Editar} />
  </Switch>
);

export default Routes;
