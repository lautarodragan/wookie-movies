import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Movie, WookieMoviesApiClient } from '../../src/wookie-movies-api-client'
import { Header } from '../../components/header'
import { LetterBoxed } from '../../components/letter-boxing'

const Movie = () => {
  const router = useRouter()
  const { id } = router.query

  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movie, setMovie] = useState<Movie>()
  const stars = useMemo(() => {
    if (!movie)
      return ''

    const count = Math.round(movie.imdb_rating / 2) // could be Math.floor. Partial stars would be even better.
    return '⭐'.repeat(count)
  }, [movie])

  useEffect(() => {
    if (!id)
      return
    wookieMoviesApiClient.getMovie(id as string).then(movieResponse => setMovie(movieResponse))
  }, [id])

  return (
    <div>
      <Header/>

      <LetterBoxed>
        <StyledMovie>
          <img src={movie?.poster} alt="Movie Poster"/>
          <StyledDetails>
            <TitleAndRating>
              <h1>{movie?.title} ({movie?.imdb_rating})</h1>
              <span>{stars}</span>
            </TitleAndRating>
            <p>{movie && (new Date(movie.released_on)).getFullYear()} | {movie?.length} | {movie?.director}</p>
            <p>{movie?.genres.join(', ')}</p>
            <p>Cast: {movie?.cast.join(', ')}</p>
            <p>{movie?.overview}</p>
          </StyledDetails>
        </StyledMovie>
      </LetterBoxed>
    </div>
  )
}

const StyledMovie = styled.main`
  display: flex;
  padding: 3rem 6rem;
  max-width: 1280px;
`

const StyledDetails = styled.div`
  padding: 0 3rem;
`

const TitleAndRating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2rem 0;

  h1 {
    margin: 0;
    font-size: 2rem;
  }
`

export default Movie
