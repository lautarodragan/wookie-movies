import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import styles from '../styles/Home.module.css'

import { Movie, WookieMoviesApiClient } from '../src/wookie-movies-api-client'

const Home: NextPage = () => {
  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movies, setMovies] = useState<readonly Movie[]>([])

  useEffect(() => {
    wookieMoviesApiClient.getMovies().then(_ => _.json()).then(responseBody => setMovies(responseBody.movies))
  }, [])

  useEffect(() => {
    console.log('movies changed', movies)
  }, [movies])

  return (
    <div className={styles.container}>
      <Head>
        <title>Wookie Movies</title>
        <meta name="description" content="From Earth to Thikkiiana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Wookie <br/>
          Movies
        </h1>

        <p className={styles.search}>
          <input type="text" placeholder="Search movies..." />
        </p>
      </header>

      <main className={styles.main}>

        <div className={styles.grid}>

          {movies.map(movie => (
            <a
              key={movie.id}
              href={`/movies/${movie.slug}`}
              className={styles.card}
            >
              <div className={styles.cardBackground} style={{ backgroundImage: `url(${movie.backdrop})` }}></div>
              <h2>{movie.title}</h2>
              <div className={styles.cardInfo}>
                <span>⭐ {movie.imdb_rating}</span>
                <span>{movie.length}</span>
              </div>
              <p>{movie.overview}</p>
            </a>
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
