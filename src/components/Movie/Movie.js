import React from 'react';
import Rating from 'react-rating';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { convertToHoursAndMinutes } from '../../helpers/functions';

import { Poster } from '../Poster/Poster';
import { Tooltip } from '../Tooltip/Tooltip';
import { useTooltip } from '../../hooks/useTooltip';

export const Movie = ({ movie }) => {
  const [hours, minutes] = convertToHoursAndMinutes(movie.runtime);
  const [tooltip, renderTooltip, hideTooltip] = useTooltip();

  return (
    <div>
      <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} />
      <div
        onMouseMove={renderTooltip}
        onMouseLeave={hideTooltip}
      >
        <Rating
          stop={10}
          step={2}
          fractions={2}
          initialRating={Math.floor(movie.vote_average)}
          emptySymbol={<IoMdStarOutline />}
          fullSymbol={<IoMdStar />}
          readonly
        />
        { tooltip({
          element: <Tooltip>Exact Score: {movie.vote_average}</Tooltip>,
        }) }
      </div>
      <header>
        <h1>{movie.title}</h1>
        <div>
          <span>{hours + 'h ' + minutes + 'm' || '...'}</span>
          <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
        </div>
      </header>
      <main>
        <p>{movie.overview}</p>
        <div>
          <a rel="noopener noreferrer" target="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}`}>
            <button>View on IMDb</button>
          </a>
          <a rel="noopener noreferrer" target="_blank" href={`https://www.amazon.co.uk/s?k=${movie.title}`}>
            <button>Search on Amazon</button>
          </a>
        </div>
      </main>

    </div>
  );
}
