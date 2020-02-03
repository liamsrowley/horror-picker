import { useState, useEffect } from 'react';
import moviedb from '../../api/moviedb';

import {
  defaultMovie,
  defaultConfig,
  defaultParams
} from '../../config/defaults';

import { randomNumBetween } from '../../helpers';

export const useProvideMovie = () => {
  const [movie, setMovie] = useState(defaultMovie);
  const [config, setConfig] = useState(defaultConfig);
  const [params, setParams] = useState(defaultParams);
  const [isLoading, setIsLoading] = useState(false);

  console.log(config);


  const fetchMovie = async (voteAverage = 7) => {
    try {
      setIsLoading(true);
      setMovie({});
      // Initial list of movies within paramter range
      const movieList = await moviedb.get('/discover/movie', { params });

      // Select a random page from the results and get the movies on that page
      const totalPages = movieList.data.total_pages;
      const selectedPageIndex = randomNumBetween(1, totalPages);

      const paramsWithPage = {
        ...params,
        'page': selectedPageIndex
      }

      const selectedPage = await moviedb.get('/discover/movie', { params: paramsWithPage });

      // Select a random movie from the selected page and get its full information
      const selectedMovieIndex = randomNumBetween(0, selectedPage.data.results.length - 1);
      const selectedMovieId = selectedPage.data.results[selectedMovieIndex].id;

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
    setConfig(apiConfig.data);
  }

  const buildPosterUrl = async () => {
    const {
      secure_base_url,
      poster_sizes
    } = config.images;
    const posterUrl = secure_base_url + poster_sizes[4] + movie.poster_path;
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
