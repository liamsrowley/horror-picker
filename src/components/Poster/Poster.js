import React from 'react';

import styles from './style.module.scss';

export const Poster = ({ posterUrl, movieTitle, size }) => {

  let classes = [styles['poster']];

  if (size === 'large') {
    classes.push(styles['large']);
  } else if (size === 'small') {
    classes.push(styles['small']);
  } else if (size === 'fluid') {
    classes.push(styles['fluid']);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${posterUrl})`
      }}
      className={classes.join(' ')}
    />
  )
}
