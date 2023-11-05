import React from 'react'
import NavBar from '../../components/user/NavBar'
import Footer from '../../components/user/Footer'

export default function LandingLayout({children}) {
  return (
    <div>
        <NavBar />
        {
            children
        }
        <Footer />
    </div>
  )
}
