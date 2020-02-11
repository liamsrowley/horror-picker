import React from 'react';
import Rating from 'react-rating';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { useMovie } from '../../hooks/useMovie';

import styles from './style.module.scss';

export const MovieSelector = () => {
  const [movie, movieActions, movieState, params] = useMovie();
  const { fetchMovie, setMovieParams } = movieActions;

  const handleChange = (value) => {
    setMovieParams(500, value);
  }

  return (
    <div className={styles['movie-selector']}>
      <h3>Find me a</h3>
      <Rating
        stop={10}
        step={2}
        fractions={2}
        initialRating={params['vote_average.gte']}
        emptySymbol={<IoMdStarOutline />}
        fullSymbol={<IoMdStar />}
        onChange={handleChange}
      />
      <h3>horror movie.</h3>
    </div>
  );
}
