import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import movies from '../movies.json'
import { Movie } from '../../clients/wookie-movies-api-client'
import { MoviesByGenre } from '../../components/movies-by-genre'

const theDarkKnight = movies.find(_ => _.id === 'd6822b7b-48bb-4b78-ad5e-9ba04c517ec8') as Movie

describe('MoviesByGenre', () => {
  const server = setupServer(
    rest.get('https://wookie.codesubmit.io/movies', (req: any, res: any, ctx: any) => {
      return res(ctx.json({ movies }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('loads movies', async () => {
    render(<MoviesByGenre/>)

    const title = await screen.findAllByText(theDarkKnight.title)

    expect(title).toHaveLength(theDarkKnight.genres.length)
  })
})
