import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';

export const App = () => {
  return (
    <Router history={history}>
      <Route path="/" exact component={HomePage} />
      <Route path="/movie/:id" exact component={MoviePage} />
      <Route path="/movie" exact component={MoviePage} />
    </Router>
  );
}
