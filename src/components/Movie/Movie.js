import React from 'react';
import Rating from 'react-rating';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { convertToHoursAndMinutes } from '../../helpers/functions';

import { Poster } from '../Poster/Poster';
import { Tooltip } from '../Tooltip/Tooltip';
import { useTooltip } from '../../hooks/useTooltip';
import { Button } from '../UI/Button/Button';

import styles from './style.module.scss';

export const Movie = ({ movie }) => {
  const [hours, minutes] = convertToHoursAndMinutes(movie.runtime);
  const [tooltip, renderTooltip, hideTooltip] = useTooltip();

  return (
    <div className={styles['movie']}>
      <Poster posterUrl={movie.posterUrl} movieTitle={movie.title} />
      <div
        onMouseMove={renderTooltip}
        onMouseLeave={hideTooltip}
        className={styles['movie-rating']}
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
      <header className={styles['header']}>
        <h1 className={styles['title']}>{movie.title}</h1>
        <div className={styles['meta']}>
          <span className={styles['meta-item']}>{hours + 'h ' + minutes + 'm' || '...'}</span>
          <span className={styles['meta-item']}>{movie.genres.map(genre => genre.name).join(', ')}</span>
        </div>
      </header>
      <main className={styles['content']}>
        <p className={styles['text']}>{movie.overview}</p>
        <div className={styles['links']}>
          <a rel="noopener noreferrer" target="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}`} className={styles['link']}>
            <Button>View on IMDb</Button>
          </a>
        </div>
      </main>
    </div>
  );
}
