import { useRef } from 'react'
import { MovieCard } from './movie-card'
import { Movie } from '../clients/wookie-movies-api-client'
import styled from 'styled-components'


interface MovieListContainerProps {
  readonly movies: readonly Movie[]
}

export const MovieListContainer = ({ movies }: MovieListContainerProps) => {
  const ref = useRef<any>(null)

  const onNext = () => {
    ref.current?.scrollBy(370, 0)
  }

  const onPrevious = () => {
    ref.current?.scrollBy(-370, 0)
  }

  return (
    <MovieListContainerStyled>
      <ScrollButton direction="left" onClick={onPrevious}>⇐</ScrollButton>
      <MovieList ref={ref}>
        <MovieListFullSize>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MovieListFullSize>
      </MovieList>
      <ScrollButton direction="right" onClick={onNext}>⇒</ScrollButton>
    </MovieListContainerStyled>
  )
}

const MovieListContainerStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6rem;
`

/** The visible portion of the movie list **/
const MovieList = styled.div`
  overflow: hidden;
  max-width: 100%;
  mask-image: linear-gradient(to left, #fff0 0, #fff3 50px, #fffa 100px, #ffff 150px);
  scroll-behavior: smooth;
`

/** The actual, full size movie list, which overflows and may have a portion hidden **/
const MovieListFullSize = styled.div`
  display: flex;
  flex-direction: row;
`

interface NextButtonProps {
  readonly direction: 'left' | 'right'
}

const ScrollButton = styled.div<NextButtonProps>`
  ${props => props.direction === 'left' ? 'margin-right' : 'margin-left'}: 1rem;
  
  border: 1px solid black;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
`
