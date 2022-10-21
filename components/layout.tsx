import { Header } from './header'
import { Footer } from './footer'
import React from 'react'

interface LayoutProps {
  readonly children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header/>
    {children}
    <Footer/>
  </div>
)
