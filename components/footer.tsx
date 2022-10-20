import Image from 'next/image'
import styled from 'styled-components'

export const Footer = () => (
  <FooterStyled>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <ImageStyled>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </ImageStyled>
    </a>
  </FooterStyled>
)

const FooterStyled = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`

const ImageStyled = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`
