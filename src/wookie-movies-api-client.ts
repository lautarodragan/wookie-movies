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
