import React from 'react';
import { useMovie } from '../hooks/useMovie';

export const App = () => {
  const [movie, movieActions, movieState] = useMovie();
  console.log(movieState);
  const { fetchMovie } = movieActions;
  return (
    <div>
      <button onClick={() => fetchMovie(8)}>{ movieState.isLoading ? 'Loading' : 'Fetch Movie' }</button>
      App
      <div>
        <h2>{ movie.title }</h2>
        <p>{ movie.overview }</p>
      </div>
    </div>
  );
}
