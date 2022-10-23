import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { MoviesByGenre } from '../components/movies-by-genre'
import { SearchResults } from '../components/search-results'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
  const router = useRouter()
  const { q: searchQuery } = router.query

  const isSearch = searchQuery && typeof searchQuery === 'string'

  return (
    <Layout>
      { !isSearch
        ? <MoviesByGenre/>
        : <SearchResults searchQuery={searchQuery}/>
      }
    </Layout>
  )
}

export default Home
