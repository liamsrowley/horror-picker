import { HORROR_ID } from '../constants';

export const defaultMovie = {
  spoken_languages: [],
  genres: []
};

export const defaultParams = {
  'with_genres': HORROR_ID,
  'vote_count.gte': 500,
  'vote_average.gte': 7
};

export const defaultConfig = {
  images: {
    secure_base_url: null,
    poster_sizes: [],
    backdrop_sizes: []
  }
};
