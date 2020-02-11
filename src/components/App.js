import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { PinnedPage } from '../pages/PinnedPage';

import './style.scss';

export const App = () => {
  return (
    <Router history={history}>
      <Route path="/" exact component={HomePage} />
      <Route path="/movie/:id" exact component={MoviePage} />
      <Route path="/movie" exact component={MoviePage} />
      <Route path="/pinned" exact component={PinnedPage} />
    </Router>
  );
}
