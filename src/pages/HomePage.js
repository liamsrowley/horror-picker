import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';
import { history } from '../history';

import { Layout } from '../components/Layout/Layout';

export const HomePage = () => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovie, setMovieParams } = movieActions;

  const handleClick = async () => {
    await setMovieParams(500, 7);
    await fetchMovie();
    history.push('/movie');
  }

  return (
    <Layout>
      Home
      <button onClick={handleClick}>Set Params</button>
    </Layout>
  );
}
