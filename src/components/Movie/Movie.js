import React from 'react';
import { convertToHoursAndMinutes } from '../../helpers/functions';

import { Poster } from '../Poster/Poster';

export const Movie = ({ movie }) => {
  console.log(movie);
  const [hours, minutes] =convertToHoursAndMinutes(movie.runtime);
  return (
    <div>
      <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} />
      <h1>{movie.title}</h1>
      <div>
        <span>{hours + 'h ' + minutes + 'm' || '...'}</span>
        <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
      </div>
      <div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
