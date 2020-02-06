import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';
import { history } from '../history';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import Rating from 'react-rating';

import { Layout } from '../components/Layout/Layout';

export const HomePage = () => {
  const [movie, movieActions, movieState, params] = useMovie();
  const { fetchMovie, setMovieParams } = movieActions;

  const handleChange = (value) => {
    setMovieParams(500, value);
  }

  const handleClick = async () => {
    await fetchMovie();
    history.push('/movie');
  }

  return (
    <Layout>
      <Rating
        stop={10}
        step={2}
        fractions={2}
        initialRating={params['vote_average.gte']}
        emptySymbol={<IoMdStarOutline />}
        fullSymbol={<IoMdStar />}
        onChange={handleChange}
        />
      <button onClick={handleClick}>Search</button>
    </Layout>
  );
}
