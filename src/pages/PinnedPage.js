import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { Poster } from '../components/Poster/Poster';

export const PinnedPage = ({ match }) => {
  const pinnedMovies = JSON.parse(localStorage.getItem('pinnedMovies') || '[]');

  const renderPinnedMovies = () => (
    pinnedMovies.map(movie => (
      <div key={movie.id}>
        <Link to={`movie/${movie.id}`}>
          <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} />
        </Link>
      </div>
    ))
  )

  return (
    <Layout>
      { renderPinnedMovies() }
    </Layout>
  );
}
