import React, { useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';

export const Poster = () => {
  const [movie, movieActions, movieState] = useMovie();
  const { buildPosterUrl } = movieActions;

  useEffect(() => {
    buildPosterUrl();
  }, [movie.id]);

  return <img src={movie.posterUrl} alt="Movie Poster" />
}
