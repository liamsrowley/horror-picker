import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';

import { Layout } from '../components/Layout/Layout';

import { Movie } from '../components/Movie/Movie';

export const MoviePage = ({ match }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovieById, fetchMovie } = movieActions;

  const movieId = match.params.id;

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
    } else {
      fetchMovie();
    }
  }, []);

  return (
    <Layout>
      <Movie movie={movie} />
      <button onClick={fetchMovie}>Fetch Movie</button>
    </Layout>
  );
}
