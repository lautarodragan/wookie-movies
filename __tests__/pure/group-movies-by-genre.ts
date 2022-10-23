import { describe, expect, test } from '@jest/globals';

import { groupMoviesByGenre } from '../../pure/group-movies-by-genre'
import movies from '../movies.json'
import output from './output.json'

describe('groupMoviesByGenre', () => {
  test('work as expected on the common API response', () => {
    expect(groupMoviesByGenre(movies)).toEqual(output);
  });
})
