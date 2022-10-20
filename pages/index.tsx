import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Movie, WookieMoviesApiClient } from '../src/wookie-movies-api-client'
import { Header } from '../components/header'
import { MovieCard } from '../components/movie-card'
import { Footer } from '../components/footer'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { q: searchQuery } = router.query
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])

  useEffect(() => {
    wookieMoviesApiClient.getMovies(searchQuery as string).then(movieResponse => setMovies(movieResponse.movies))
  }, [searchQuery])

  return (
    <div>
      <Header/>

      <Main>
        <Grid>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </Grid>
      </Main>

      <Footer/>
    </div>
  )
}

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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

export default Home
