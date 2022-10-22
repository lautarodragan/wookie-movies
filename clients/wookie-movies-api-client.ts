const apiUrl = 'https://wookie.codesubmit.io/movies'

const createApiUrl = (searchQuery = '') =>
  !searchQuery
    ? apiUrl
    : `${apiUrl}?q=${searchQuery}`

export const WookieMoviesApiClient = ({ authorization = 'Bearer Wookie2021' } = {}) => {
  const authenticatedJsonFetch = (url: string) =>
    fetch(url, {
      headers: { authorization },
    }).then(_ => _.json())

  const getMovies = (searchQuery = ''): Promise<MoviesResposne> =>
    authenticatedJsonFetch(createApiUrl(searchQuery))

  const getMovie = (movieSlug = ''): Promise<Movie> =>
    authenticatedJsonFetch(`${apiUrl}/${movieSlug}`)

  return {
    getMovies,
    getMovie,
  }
}

export interface Movie extends Readonly<{
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
}> {}

export type MoviesResposne = Readonly<{
  movies: readonly Movie[]
}>
