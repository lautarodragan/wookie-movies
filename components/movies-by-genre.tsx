import styled from 'styled-components'

import { Movie } from '../src/wookie-movies-api-client'
import { MovieCard } from './movie-card'

type SearchResults = Readonly<{
  moviesByGenre: readonly [genre: string, movies: readonly Movie[]][]
}>

export const MoviesByGenre = ({ moviesByGenre }: SearchResults) => (
  <MoviesByGenreStyled>
    { moviesByGenre.map(([genre, movies]) => (
      <Genre>
        <h3>{genre}</h3>
        <MovieListContainer>
          <div>
            {movies.map(movie => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </MovieListContainer>
      </Genre>
    ))}
  </MoviesByGenreStyled>
)

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

const MovieListContainer = styled.div`
  overflow: hidden;
  max-width: 100%;
  
  >div {
    display: flex;
    flex-direction: row;
  }
  
`
