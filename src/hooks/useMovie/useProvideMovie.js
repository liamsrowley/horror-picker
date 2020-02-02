import { useState } from 'react';
import moviedb from '../../api/moviedb';

import { HORROR_ID } from '../../constants';
import { randomNumBetween } from '../../helpers';

export const useProvideMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovie = async (voteAverage = 9) => {
    // Params that determine the range of horror movies returned
    const params = {
      'with_genres': HORROR_ID,
      'vote_average.gte': voteAverage,
      'vote_count.gte': 500
    }

    console.log('Initial params: ', params);

    try {
      setIsLoading(true);
      // Initial list of movies within paramter range
      const movieList = await moviedb.get('/discover/movie', { params });
      console.log('Initial data: ', movieList);

      // Select a random page from the results and get the movies on that page
      const totalPages = movieList.data.total_pages;
      const selectedPageIndex = randomNumBetween(1, totalPages);

      console.log('Total pages: ', totalPages);
      console.log('Selected page: ', selectedPageIndex);

      const paramsWithPage = {
        ...params,
        'page': selectedPageIndex
      }

      const selectedPage = await moviedb.get('/discover/movie', { params: paramsWithPage });
      console.log(selectedPage);

      // Select a random movie from the selected page and get its full information
      const selectedMovieIndex = randomNumBetween(0, selectedPage.data.results.length - 1);
      const selectedMovieId = selectedPage.data.results[selectedMovieIndex].id;
      console.log(selectedPage.data.results[selectedMovieIndex]);

      if (selectedMovieId === movie.id) {
        console.log('Same as previous movie');
        fetchMovie(voteAverage);
      }

      const selectedMovie = await moviedb.get(`/movie/${selectedMovieId}`);
      setMovie(selectedMovie.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const actions = {
    fetchMovie
  };

  const state = {
    isLoading
  };

  return [movie, actions, state];
}
