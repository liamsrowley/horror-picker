import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';

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
    <div>
      Movie
    </div>
  );
}
