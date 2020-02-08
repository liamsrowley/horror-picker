import React, { useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';

import backgroundImage from '../../background.png';
import { Header } from '../Header/Header';

export const Layout = ({ children }) => {
  const [movie, movieActions, movieState] = useMovie();

  const pageBackground = movie.backdropUrl ? movie.backdropUrl : backgroundImage;

  return (
    <div
      style={{
        backgroundImage: `url(${pageBackground})`
      }}
    >
      <Header />
      { children }
    </div>
  );
}
