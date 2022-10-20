import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { DocumentHead } from './document-head'

export const Header = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (event.key === 'f' && event.ctrlKey) {
        event.preventDefault()
        inputRef.current?.focus()
      } else if (event.key === 'Escape') {
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', eventListener)

    return () => document.removeEventListener('keydown', eventListener)
  }, [])

  const onKeyDown = (key: string) => {
    if (key === 'Enter') {
      router.push(`/?q=${search}`)
    }
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
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => onKeyDown(e.key)}
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
