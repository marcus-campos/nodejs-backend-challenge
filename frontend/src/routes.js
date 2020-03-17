import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Room from './pages/Room'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/room/:id" component={Room}/>
    </Switch>
  );
}
