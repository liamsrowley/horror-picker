export const convertToHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return [hours, minutes];
}

export const movieIsPinned = (id) => {
  const movies = JSON.parse(localStorage.getItem('pinnedMovies') || '[]');
  if (movies.find(movie => movie.id === id)) {
    return true;
  }
  return false;
}
