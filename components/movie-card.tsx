import { Movie } from '../src/wookie-movies-api-client'

import styles from '../styles/Home.module.css'

type MovieCardProps = Readonly<{
  movie: Movie
}>

export const MovieCard = ({ movie }: MovieCardProps) => (
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
)
