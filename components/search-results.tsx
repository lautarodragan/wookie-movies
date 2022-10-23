import styled from 'styled-components'

import { MovieCard } from './movie-card'
import { Movie, WookieMoviesApiClient } from '../clients/wookie-movies-api-client'
import { useEffect, useMemo, useState } from 'react'

interface SearchResultsProps {
  readonly searchQuery: string
}

export const SearchResults = ({ searchQuery }: SearchResultsProps) => {
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])

  useEffect(() => {
    wookieMoviesApiClient.getMovies(searchQuery).then(movieResponse => setMovies(movieResponse.movies))
  }, [searchQuery])

  return (
    <SearchResultsStyled>
      <Grid>
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Grid>
    </SearchResultsStyled>
  )
}

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
