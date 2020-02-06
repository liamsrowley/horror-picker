import React from 'react';

export const Poster = ({ posterUrl, movieTitle }) => {
  return <img src={`${posterUrl}`} alt={`${movieTitle} Poster`} />
}
