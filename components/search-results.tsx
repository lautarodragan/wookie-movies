import styled from 'styled-components'

import { MovieCard } from './movie-card'
import { Movie } from '../src/wookie-movies-api-client'

interface SearchResultsProps {
  readonly movies: readonly Movie[]
}

export const SearchResults = ({ movies }: SearchResultsProps) => (
  <SearchResultsStyled>
    <Grid>
      {movies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </Grid>
  </SearchResultsStyled>
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

const SearchResultsStyled = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
