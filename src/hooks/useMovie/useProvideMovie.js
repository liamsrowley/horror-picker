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

  const fetchMovie = async (voteAverage = 7) => {
    try {
      setIsLoading(true);
      setMovie(defaultMovie);

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

      // Fetch another movie if the same movie is fetched twice
      if (selectedMovieId === movie.id) {
        fetchMovie(voteAverage);
      }

      // Fetch the full movie details
      const selectedMovie = await moviedb.get(`/movie/${selectedMovieId}`);
      setMovie(selectedMovie.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  // Allows users to jump to a specific movie if they know the id
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

  const buildImageUrls = async () => {
    console.log('Building Image URLs');
    const {
      secure_base_url,
      poster_sizes,
      backdrop_sizes
    } = config.images;
    const posterUrl = secure_base_url + poster_sizes[3] + movie.poster_path;
    const backdropUrl = secure_base_url + backdrop_sizes[3] + movie.backdrop_path;
    setMovie({
      ...movie,
      posterUrl,
      backdropUrl
    });
  }

  const setMovieParams = (minReviewCount, minRating) => {
    setParams({
      ...params,
      'vote_average.gte': minRating,
      'vote_count.gte': minReviewCount
    });
  }

  // Fetch api config for image paths and sizes on mount
  useEffect(() => {
    fetchApiConfig();
  }, []);

  // Rebuild poster + backdrop urls when movie changes
  useEffect(() => {
    buildImageUrls();
  }, [movie.id, config]);

  const actions = {
    fetchMovie,
    fetchMovieById,
    setMovieParams
  };

  const state = {
    isLoading
  };

  return [movie, actions, state];
}
