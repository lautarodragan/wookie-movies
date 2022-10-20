import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'

import styles from '../styles/Home.module.css'

import { Movie, WookieMoviesApiClient } from '../src/wookie-movies-api-client'
import { Header } from '../components/header'
import { MovieCard } from '../components/movie-card'
import { Footer } from '../components/footer'

const Home: NextPage = () => {
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    wookieMoviesApiClient.getMovies(search).then(movieResponse => setMovies(movieResponse.movies))
  }, [search])

  useEffect(() => {
    console.log('movies changed', movies)
  }, [movies])

  return (
    <div className={styles.container}>
      <Header onSearch={searchQuery => setSearch(searchQuery)} />

      <main className={styles.main}>
        <div className={styles.grid}>
          {movies.map(movie => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </main>

      <Footer/>
    </div>
  )
}

export default Home
