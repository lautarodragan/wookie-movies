import { Movie } from '../src/wookie-movies-api-client'
import { MovieCard } from './movie-card'

type SearchResults = Readonly<{
  moviesByGenre: readonly [genre: string, movies: readonly Movie[]][]
}>

export const MoviesByGenre = ({ moviesByGenre }: SearchResults) => (
  <div>
    { moviesByGenre.map(([genre, movies]) => (
      <div>
        <h3>{genre}</h3>
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    ))}
  </div>
)
