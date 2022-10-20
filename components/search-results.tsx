import styled from 'styled-components'

import { MovieCard } from './movie-card'
import { Movie } from '../src/wookie-movies-api-client'

interface SearchResultsProps {
  readonly movies: readonly Movie[]
}

export const SearchResults = ({ movies }: SearchResultsProps) => (
  <Grid>
    {movies.map(movie => (
      <MovieCard movie={movie} key={movie.id} />
    ))}
  </Grid>
)

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`
