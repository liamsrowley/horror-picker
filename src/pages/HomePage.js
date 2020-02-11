import React from 'react';
import { useMovie } from '../hooks/useMovie';

import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button/Button';
import { MovieSelector } from '../components/MovieSelector/MovieSelector';

import styles from './style.module.scss';

export const HomePage = () => {
  const [movie, movieActions, movieState, params] = useMovie();
  const { fetchMovie, setMovieParams } = movieActions;

  const handleChange = (value) => {
    setMovieParams(500, value);
  }

  const handleClick = async () => {
    await fetchMovie('/movie');
  }

  return (
    <Layout>
      <main className={styles['page']}>
        <MovieSelector />
        <div className={styles['page-controls']}>
          <Button isLoading={movieState.isLoading} onClick={handleClick}>Search</Button>
        </div>
      </main>
    </Layout>
  );
}
