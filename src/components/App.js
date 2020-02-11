import React from 'react';
import { Router, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { history } from '../history';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { PinnedPage } from '../pages/PinnedPage';

import './style.scss';

export const App = () => {
  return (
    <Router history={history}>
      <IconContext.Provider value={{ className: 'icon' }}>
        <Route path="/" exact component={HomePage} />
        <Route path="/movie/:id" exact component={MoviePage} />
        <Route path="/movie" exact component={MoviePage} />
        <Route path="/pinned" exact component={PinnedPage} />
      </IconContext.Provider>
    </Router>
  );
}
