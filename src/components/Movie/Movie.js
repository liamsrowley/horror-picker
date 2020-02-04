import React from 'react';

import { Poster } from './Poster';

export const Movie = ({ movie }) => {
  console.log(movie);
  
  return (
    <div>
      <Poster />
      <h1>{movie.title}</h1>
      <div>
        <span>{movie.runtime || '...'}</span>
        <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
      </div>
      <div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
