import React from 'react';
import { Link } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';

import { Layout } from '../components/Layout/Layout';
import { Poster } from '../components/Poster/Poster';

import styles from './style.module.scss';

export const PinnedPage = ({ match }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovieById, fetchMovie } = movieActions;

  const pinnedMovies = JSON.parse(localStorage.getItem('pinnedMovies') || '[]');
  const renderPinnedMovies = () => (
    pinnedMovies.map(movie => (
      <div key={movie.id} className={styles['movie']} onClick={() => fetchMovieById(movie.id, `/movie/${movie.id}`)}>
        <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} size="small" />
      </div>
    ))
  )

  return (
    <Layout>
      <main className={styles['pinned-page']}>
        { renderPinnedMovies() }
      </main>
    </Layout>
  );
}
