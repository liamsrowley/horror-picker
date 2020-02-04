import React, { useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';

export const Poster = () => {
  const [movie, movieActions, movieState] = useMovie();

  return <img src={movie.posterUrl} alt={`${movie.title} Poster`} />
}
