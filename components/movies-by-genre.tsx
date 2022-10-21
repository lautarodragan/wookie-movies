import styled from 'styled-components'

import { Movie } from '../src/wookie-movies-api-client'
import { MovieListContainer } from './movie-list-container'

interface MoviesByGenreProps {
  readonly moviesByGenre: readonly [genre: string, movies: readonly Movie[]][]
}

export const MoviesByGenre = ({ moviesByGenre }: MoviesByGenreProps) => {
  return (
    <MoviesByGenreStyled>
      { moviesByGenre.map(([genre, movies]) => (
        <Genre key={genre}>
          <h3>{genre}</h3>
          <MovieListContainer movies={movies} />
        </Genre>
      ))}
    </MoviesByGenreStyled>
  )
}

const MoviesByGenreStyled = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
`

const Genre = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 0 2rem;
  
  h3 {
    font-size: 2rem;
  }
`
