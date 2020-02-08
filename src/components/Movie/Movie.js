import React from 'react';
import Rating from 'react-rating';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { convertToHoursAndMinutes } from '../../helpers/functions';

import { Poster } from '../Poster/Poster';
import { Tooltip } from '../Tooltip/Tooltip';
import { useTooltip } from '../../hooks/useTooltip';

export const Movie = ({ movie }) => {
  const [hours, minutes] = convertToHoursAndMinutes(movie.runtime);
  const [tooltip, tooltipActions] = useTooltip();
  const { setPosition, setVisibility } = tooltipActions;

  const handleHover = (e) => {
    setPosition(e.pageX, e.pageY);
    setVisibility(true);
  }

  const handleMouseLeave = () => {
    setVisibility(false);
  }

  return (
    <div>
      <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} />
      <div
        onMouseMove={handleHover}
        onMouseLeave={handleMouseLeave}
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
          element: <Tooltip>{movie.vote_average}</Tooltip>,
        }) }
      </div>
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
