import React from 'react';

import styles from './style.module.scss';

export const Poster = ({ posterUrl, movieTitle }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${posterUrl})`
      }}
      className={styles['poster']}
    />
  )
}
