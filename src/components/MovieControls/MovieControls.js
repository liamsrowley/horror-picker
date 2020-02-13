import React, { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosPin } from 'react-icons/io';
import toast from 'toasted-notes';
import { useMovie } from '../../hooks/useMovie';
import { isInLocalStorage } from '../../helpers/functions';

import { Button } from '../UI/Button/Button';

import styles from './style.module.scss';

export const MovieControls = ({ allowMovieTarversal }) => {
  const [movie, movieActions, movieState] = useMovie();
  const { fetchMovieById, fetchMovie } = movieActions;
  const [isPinned, setIsPinned] = useState();

  useEffect(() => {
    if (isInLocalStorage(movie.id)) {
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
        position: 'top-left'
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
      position: 'top-left'
    });
  }

  return (
    <div className={styles['controls']}>
      { isPinned ? (
        <Button onClick={unpinMovie} variant="highlighted" size="small">Unpin</Button>
      ) : (
        <Button onClick={pinMovie} variant="subtle" size="small">Pin</Button>
      )}
      { allowMovieTarversal && (
        <Button onClick={() => fetchMovie()} variant="subtle"  size="small" isLoading={movieState.isLoading}>Next</Button>
      )}
    </div>
  );
}
