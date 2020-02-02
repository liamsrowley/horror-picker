import React from 'react';
import { MovieContext } from './MovieContext';
import { useProvideMovie } from './useProvideMovie';

export const ProvideMovie = ({ children }) => {
  const movie = useProvideMovie();
  return (
    <MovieContext.Provider value={movie}>
      { children }
    </MovieContext.Provider>
  );
}
