import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { Poster } from '../components/Poster/Poster';

import styles from './style.module.scss';

export const PinnedPage = ({ match }) => {
  const pinnedMovies = JSON.parse(localStorage.getItem('pinnedMovies') || '[]');

  const renderPinnedMovies = () => (
    pinnedMovies.map(movie => (
      <div key={movie.id} className={styles['movie']}>
        <Link to={`movie/${movie.id}`}>
          <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} size="small" />
        </Link>
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
