import { Movie } from '../clients/wookie-movies-api-client'

export const groupMoviesByGenre = (movies: readonly Movie[]) => {
  const moviesByGenre = new Map<string, readonly Movie[]>()

  for (const movie of movies) {
    for (const genre of movie.genres) {
      const existingEntry = moviesByGenre.get(genre)
      const newEntry = existingEntry ? [...existingEntry, movie] : [movie]
      moviesByGenre.set(genre, newEntry)
    }
  }

  return [...moviesByGenre.entries()]
}
