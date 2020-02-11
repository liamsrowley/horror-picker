import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';
import { history } from '../history';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import Rating from 'react-rating';

import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button/Button';

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
      <h1>Find me a</h1>
      <Rating
        stop={10}
        step={2}
        fractions={2}
        initialRating={params['vote_average.gte']}
        emptySymbol={<IoMdStarOutline />}
        fullSymbol={<IoMdStar />}
        onChange={handleChange}
      />
      <h1>horror movie.</h1>
      <Button isLoading={movieState.isLoading} onClick={handleClick}>Search</Button>
    </Layout>
  );
}
