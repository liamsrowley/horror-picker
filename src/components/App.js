import React from 'react';
import { useMovie } from '../hooks/useMovie';

export const App = () => {
  const [movie, movieActions, movieState] = useMovie();
  console.log(movie);
  const { fetchMovie, fetchMoviePoster } = movieActions;
  return (
    <div>
      <button onClick={() => fetchMovie(6)}>{ movieState.isLoading ? 'Loading' : 'Fetch Movie' }</button>
      <button onClick={() => fetchMoviePoster()}>{ movieState.isLoading ? 'Loading' : 'Fetch Movie Poster' }</button>
      App
      <div>
        { movie.posterUrl && <img src={movie.posterUrl} alt="Movie Poster" /> }
        <h2>{ movie.title }</h2>
        <p>{ movie.overview }</p>
      </div>
    </div>
  );
}
