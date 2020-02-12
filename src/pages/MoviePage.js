import React, { useEffect } from 'react';
import 'toasted-notes/src/styles.css';

import { useMovie } from '../hooks/useMovie';
import { Layout } from '../components/Layout/Layout';
import { Movie } from '../components/Movie/Movie';
import { MovieControls } from '../components/MovieControls/MovieControls';
import { Overlay } from '../components/UI/Overlay/Overlay';
import { Spinner } from '../components/UI/Spinner/Spinner';

import styles from './style.module.scss';

export const MoviePage = ({ match }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovieById, fetchMovie } = movieActions;

  const movieId = match.params.id;

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
    } else if (!movie.id) {
      fetchMovie();
    }
  }, []);

  return (
    <Layout>
      <main className={styles['movie-page']}>
        { movieState.isLoading ? (
          <Overlay>
            <Spinner />
          </Overlay>
        ) : (
          <Movie movie={movie} />
        )}
        <MovieControls />
      </main>
    </Layout>
  );
}
