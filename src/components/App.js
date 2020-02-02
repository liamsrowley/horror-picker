import React from 'react';
import { useMovie } from '../hooks/useMovie';

export const App = () => {
  const movie = useMovie();
  return (
    <div>
      <button onClick={() => movie.fetchMovie(7)}></button>
      App
    </div>
  );
}
