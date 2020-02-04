import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { Layout } from './Layout/Layout';

export const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Route path="/" exact component={HomePage} />
        <Route path="/movie/:id" exact component={MoviePage} />
        <Route path="/movie" exact component={MoviePage} />
      </Layout>
    </Router>
  );
}
