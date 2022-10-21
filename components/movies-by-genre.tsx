import { useRef } from 'react'
import styled from 'styled-components'

import { Movie } from '../src/wookie-movies-api-client'
import { MovieCard } from './movie-card'

interface MoviesByGenreProps {
  readonly moviesByGenre: readonly [genre: string, movies: readonly Movie[]][]
}

export const MoviesByGenre = ({ moviesByGenre }: MoviesByGenreProps) => {
  return (
    <MoviesByGenreStyled>
      { moviesByGenre.map(([genre, movies]) => (
        <Genre key={genre}>
          <h3>{genre}</h3>
          <MovieListContainer movies={movies} />
        </Genre>
      ))}
    </MoviesByGenreStyled>
  )
}

interface MovieListContainerProps {
  readonly movies: readonly Movie[]
}

const MovieListContainer = ({ movies }: MovieListContainerProps) => {
  const ref = useRef<any>(null)

  const onNext = () => {
    console.log(ref.current)
    ref.current?.scrollBy(370, 0)
  }

  return (
    <MovieListContainerStyled>
      <MovieList ref={ref}>
        <div>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </MovieList>
      <NextButton onClick={onNext}>NEXT</NextButton>
    </MovieListContainerStyled>
  )
}

const MovieListContainerStyled = styled.div`
  display: flex;
  align-items: center
`

const MoviesByGenreStyled = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
`

const Genre = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 0 2rem;
  
  h3 {
    font-size: 2rem;
  }
`

const MovieList = styled.div`
  overflow: hidden;
  max-width: 100%;
  mask-image: linear-gradient(to left, #fff0 0, #fff3 50px, #fffa 100px, #ffff 150px);
  scroll-behavior: smooth;
  
  >div {
    display: flex;
    flex-direction: row;
  }
`

const NextButton = styled.div`
  margin-left: 1rem;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
`
