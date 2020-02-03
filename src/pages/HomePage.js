import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';
import { history } from '../history';

export const HomePage = () => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovie, setMovieParams } = movieActions;

  const handleClick = async () => {
    await setMovieParams(500, 7);
    await fetchMovie();
    history.push('/movie');
  }

  return (
    <div>
      Home
      <button onClick={handleClick}>Set Params</button>
    </div>
  );
}
