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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Wookie Movies internet theater!
        </h1>

        <p className={styles.description}>
          Watch the best of Earth's movies from the comfort of your home
        </p>

        <div className={styles.grid}>

          {movies.map(movie => (
            <a key={movie.id} href={`/movies/${movie.slug}`} className={styles.card}>
              <h2>{movie.title}</h2>
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
