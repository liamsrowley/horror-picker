import { useContext } from 'react';
import { MovieContext } from './MovieContext';
import { ProvideMovie } from './ProvideMovie';

export const useMovie = () => {
  return useContext(MovieContext);
}

export { ProvideMovie };
