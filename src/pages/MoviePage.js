import React, { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';

import { Layout } from '../components/Layout/Layout';
import { Movie } from '../components/Movie/Movie';

export const MoviePage = ({ match }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovieById, fetchMovie } = movieActions;

  const movieId = match.params.id;

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
    } else {
      fetchMovie();
    }
  }, []);

  const pinMovie = () => {
    const movies = JSON.parse(localStorage.getItem('pinnedMovies') || "[]");

    const movieToPin = {
      id: movie.id,
      posterUrl: movie.posterUrl,
      title: movie.title
    };

    if (movies.filter(movieStorage => movieStorage.id === movie.id).length === 0) {
      console.log('Pinning Movie...');
      movies.push(movieToPin);
      localStorage.setItem('pinnedMovies', JSON.stringify(movies));
    } else {
      console.log('Duplicate pin');
    }
  }

  return (
    <Layout>
      <Movie movie={movie} />
      <button onClick={fetchMovie}>Fetch Movie</button>
      <button onClick={pinMovie}>Pin Movie</button>
    </Layout>
  );
}
