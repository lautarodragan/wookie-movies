import React from 'react'
import styled from 'styled-components'

type LetterBoxedProps = Readonly<{
  children: React.ReactNode
}>

/**
 * Contains the children passed to this component with a max-width of 1280px.
 *
 * See https://en.wikipedia.org/wiki/Letterboxing_(filming) for a reasoning for this name.
 */
export const LetterBoxed: React.FC<LetterBoxedProps> = ({ children }) => (
  <LetterBoxedStyled>
    <div>
      {children}
    </div>
  </LetterBoxedStyled>
)

const LetterBoxedStyled = styled.div`
  display: flex;
  justify-content: center;
  >div {
    max-width: 1280px;
  }
`
