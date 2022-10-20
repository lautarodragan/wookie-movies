import { useState } from 'react'

import styles from '../styles/Home.module.css'
import Head from 'next/head'

type HeaderProps = Readonly<{
  onSearch: (searchQuery: string) => void
}>

export const Header = ({ onSearch }: HeaderProps) => {
  const [search, setSearch] = useState('')

  const onSearchInputChange = (value: string) => {
    setSearch(value)
    onSearch(value) // TODO: debounce, possibly redirect to a search-specific page
  }

  return (
    <header className={styles.header}>
      <Head>
        <title>Wookie Movies</title>
        <meta name="description" content="From Earth to Thikkiiana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        Wookie <br/>
        Movies
      </h1>

      <p className={styles.search}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={e => onSearchInputChange(e.target.value)}
        />
      </p>
    </header>
  )
}
