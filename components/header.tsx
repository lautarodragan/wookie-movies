import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import { DocumentHead } from './document-head'

type HeaderProps = Readonly<{
  onSearch: (searchQuery: string) => void
}>

export const Header = ({ onSearch }: HeaderProps) => {
  const [search, setSearch] = useState('')

  const onSearchInputChange = (value: string) => {
    setSearch(value)
    onSearch(value) // TODO: debounce, possibly redirect to a search-specific page
  }

  return (
    <>
      <DocumentHead />
      <StyledHeader>
        <h1>
          <Link href="/">
            <a>
              Wookie <br/>
              Movies
            </a>
          </Link>
        </h1>

        <p>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => onSearchInputChange(e.target.value)}
          />
        </p>
      </StyledHeader>
    </>
  )
}

const StyledHeader = styled.header`
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 1rem;
  background: white;
  border-bottom: 3px solid black;
  
  h1 {
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
    text-align: center;
  }
  
  p {
    margin: 0 0 0 auto;
    line-height: 1.5;
    font-size: 1.5rem;
    align-self: flex-end;
  }
`
