import Link from 'next/link'

import styled from 'styled-components'

import { Movie } from '../src/wookie-movies-api-client'

type MovieCardProps = Readonly<{
  movie: Movie
}>

export const MovieCard = ({ movie }: MovieCardProps) => (
  <Link href={`/movies/${movie.slug}`} passHref={true}>
    <MovieCardStyled>
      <MovieCardBackground style={{ backgroundImage: `url(${movie.backdrop})` }} />
      <h2>{movie.title}</h2>
      <MovieCardInfo>
        <span>⭐ {movie.imdb_rating}</span>
        <span>{movie.length}</span>
      </MovieCardInfo>
      <p>{movie.overview}</p>
    </MovieCardStyled>
  </Link>
)

const MovieCardStyled = styled.a`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 370px;
  height: 270px;
  margin: 1rem;
  padding: 0;
  text-align: left;
  color: white;
  text-shadow: 0 0 10px black;
  text-decoration: none;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0 2px 2px #000000aa, 0 0 2px 1px #000000aa inset;
    
    & h2 {
      text-decoration: underline;
    }
  }
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    padding: 1.5rem;
    backdrop-filter: saturate(0.5) brightness(0.5);
  }
  
  p {
    margin: 1rem 1.5rem 1.5rem 1.5rem;;
    font-size: 1.25rem;
    line-height: 1.5;
    overflow: hidden;
  }
`

const MovieCardBackground = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(3px);
  background-size: cover;
`

const MovieCardInfo = styled.div`
  margin: 1.5rem 1.5rem 0 1.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
