import React, { useEffect, useState } from 'react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import { useMovie } from '../hooks/useMovie';
import { movieIsPinned } from '../helpers/functions';
import { Layout } from '../components/Layout/Layout';
import { Movie } from '../components/Movie/Movie';

export const MoviePage = ({ match }) => {
  const [movie, movieActions, movieState] = useMovie();
  const [isPinned, setIsPinned] = useState();
  const { fetchMovieById, fetchMovie } = movieActions;

  const movieId = match.params.id;

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
    } else if (!movie.id) {
      fetchMovie();
    }
  }, []);

  useEffect(() => {
    if (movieIsPinned(movie.id)) {
      setIsPinned(true);
    } else {
      setIsPinned(false);
    }
  }, [movie.id]);

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
      setIsPinned(true);
      toast.notify(`Pinned Movie: '${movie.title}'`, {
        position: 'bottom-left'
      });
    } else {
      console.log('Duplicate pin');
    }
  }

  const unpinMovie = () => {
    setIsPinned(false);
    const storedMovies = JSON.parse(localStorage.getItem('pinnedMovies'));
    const updatedMovies = storedMovies.filter(storedMovie => storedMovie.id !== movie.id);
    localStorage.setItem('pinnedMovies', JSON.stringify(updatedMovies));
    toast.notify(`Unpinned Movie: '${movie.title}'`, {
      position: 'bottom-left'
    });
  }

  return (
    <Layout>
      <Movie movie={movie} />
      <button onClick={() => fetchMovie()}>Fetch Movie</button>
      { isPinned ? (
        <button onClick={unpinMovie}>Unpin</button>
      ) : (
        <button onClick={pinMovie}>Pin Movie</button>
      )}
    </Layout>
  );
}
