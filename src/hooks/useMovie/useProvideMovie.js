import { useState, useEffect } from 'react';
import moviedb from '../../api/moviedb';

import { HORROR_ID } from '../../constants';
import { randomNumBetween } from '../../helpers';

export const useProvideMovie = () => {
  const [movie, setMovie] = useState({});
  const [config, setConfig] = useState({});
  const [params, setParams] = useState({
    'with_genres': HORROR_ID
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovie = async (voteAverage = 7) => {
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

  const fetchMovieById = async (movieId) => {
    try {
      setIsLoading(true);
      const selectedMovie = await moviedb.get(`/movie/${movieId}`);
      setMovie(selectedMovie.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const fetchApiConfig = async () => {
    const apiConfig = await moviedb.get('/configuration');
    console.log(apiConfig.data);
    setConfig(apiConfig.data);
  }

  const buildPosterUrl = async () => {
    const {
      secure_base_url,
      poster_sizes
    } = config.images;
    const posterUrl = secure_base_url + poster_sizes[3] + movie.poster_path;
    setMovie({
      ...movie,
      posterUrl
    });
  }

  const setMovieParams = (minReviewCount, minRating) => {
    setParams({
      ...params,
      'vote_average.gte': minRating,
      'vote_count.gte': minReviewCount
    });
    console.log(params);
  }

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const actions = {
    fetchMovie,
    fetchMovieById,
    setMovieParams,
    buildPosterUrl
  };

  const state = {
    isLoading
  };

  return [movie, actions, state];
}
