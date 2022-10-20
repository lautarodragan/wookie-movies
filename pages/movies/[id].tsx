import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Movie, WookieMoviesApiClient } from '../../src/wookie-movies-api-client'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  const wookieMoviesApiClient = useMemo(() => WookieMoviesApiClient(), [])
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    if (!id)
      return
    wookieMoviesApiClient.getMovie(id as string).then(movieResponse => setMovie(movieResponse))
  }, [id])

  useEffect(() => {
    console.log('movie changed', movie)
  }, [movie])

  return (
    <main>
      <div>
        <img src={movie?.poster} alt="Movie Poster"/>
      </div>
      <div>
        <h1>{movie?.title} ({movie?.imdb_rating})</h1>
        <p>{movie?.released_on} | {movie?.length} | {movie?.director}</p>
        <p>Cast: {movie?.cast.join(', ')}</p>
        <p>{movie?.overview}</p>
      </div>
    </main>
  )
}

export default Post
