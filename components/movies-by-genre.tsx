import styled from 'styled-components'

import { Movie, WookieMoviesApiClient } from '../clients/wookie-movies-api-client'
import { MovieListContainer } from './movie-list-container'
import { useEffect, useMemo, useState } from 'react'
import { groupMoviesByGenre } from '../pure/group-movies-by-genre'

export const MoviesByGenre = () => {
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])
  const moviesByGenre = useMemo(() => groupMoviesByGenre(movies), [movies])

  useEffect(() => {
    wookieMoviesApiClient.getMovies().then(movieResponse => setMovies(movieResponse.movies))
  }, [])

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
  width: 100%;
  
  h3 {
    font-size: 2rem;
    padding: 2rem 4rem;
    color: white;
    background-color: #444;
  }
`
