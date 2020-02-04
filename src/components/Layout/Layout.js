import React, { useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';

export const Layout = ({ children }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { buildPosterUrl } = movieActions;

  useEffect(() => {
    buildPosterUrl();
  }, [movie.id]);

  return (
    <div
      style={{
        backgroundImage: `url(${movie.backdropUrl})`
      }}
    >
      { children }
    </div>
  );
}
