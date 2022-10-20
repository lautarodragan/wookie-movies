const apiUrl = 'https://wookie.codesubmit.io/movies'

const createApiUrl = (searchQuery = '') =>
  !searchQuery
    ? apiUrl
    : `${apiUrl}?q=${searchQuery}`

export const WookieMoviesApiClient = ({ authorization = 'Bearer Wookie2021' } = {}) => {
  const getMovies = (searchQuery = '') =>
    fetch(createApiUrl(searchQuery), {
      headers: { authorization },
    })

  return {
    getMovies,
  }
}

export type Movie = Readonly<{
  backdrop: string
  cast: readonly string[]
  classification: string
  director: string
  genres: readonly string[]
  id: string
  imdb_rating: number
  length: string
  overview: string
  poster: string
  released_on: string
  slug: string
  title: string
}>
