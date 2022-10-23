import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import movies from '../movies.json'
import { MovieCard } from '../../components/movie-card'
import { Movie } from '../../clients/wookie-movies-api-client'

const theDarkKnight = movies.find(_ => _.id === 'd6822b7b-48bb-4b78-ad5e-9ba04c517ec8') as Movie

describe('MovieCard', () => {

  test('displays movie title, overview and has correct link', async () => {
    render(<MovieCard movie={theDarkKnight}/>)

    expect(screen.getByRole('heading')).toHaveTextContent(theDarkKnight.title)
    expect(screen.getByRole('link')).toHaveAttribute('href', `/movies/${theDarkKnight.slug}`)
    expect(screen.getByText(theDarkKnight.overview)).toBeDefined()
  })

})

