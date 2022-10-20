import { Movie } from '../src/wookie-movies-api-client'
import { MovieCard } from './movie-card'

type SearchResults = Readonly<{
  moviesByGenre: Map<string, readonly Movie[]>
}>

export const MoviesByGenre = ({ moviesByGenre }: SearchResults) => (
  <div>
    {[...moviesByGenre.entries()].map(([genre, movies]) => (
      <div>
        <h3>{genre}</h3>
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    ))}
  </div>
)
