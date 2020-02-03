import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Home } from '../pages/Home';
import { Movie } from '../pages/Movie';

export const App = () => {
  return (
    <Router history={createBrowserHistory()}>
      <Route path="/" exact component={Home} />
      <Route path="/movie/:id" exact component={Movie} />
      <Route path="/movie" exact component={Movie} />
    </Router>
  );
}
