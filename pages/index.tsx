import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Movie, WookieMoviesApiClient } from '../src/wookie-movies-api-client'
import { groupMoviesByGenre } from '../src/group-movies-by-genre'

import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { MoviesByGenre } from '../components/movies-by-genre'
import { SearchResults } from '../components/search-results'

const Home: NextPage = () => {
  const router = useRouter()
  const { q: searchQuery } = router.query
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])
  const moviesByGenre = useMemo(() => searchQuery ? [] : groupMoviesByGenre(movies), [movies])

  useEffect(() => {
    wookieMoviesApiClient.getMovies(searchQuery as string).then(movieResponse => setMovies(movieResponse.movies))
  }, [searchQuery])

  return (
    <div>
      <Header/>

      <Main>
        { !searchQuery && <MoviesByGenre moviesByGenre={moviesByGenre} />}
        { searchQuery && <SearchResults movies={movies} /> }
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

export default Home
