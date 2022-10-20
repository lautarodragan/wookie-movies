import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import styles from '../styles/Home.module.css'

import { Movie, WookieMoviesApiClient } from '../src/wookie-movies-api-client'
import { Header } from '../components/header'
import { MovieCard } from '../components/movie-card'

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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
