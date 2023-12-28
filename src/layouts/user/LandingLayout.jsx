import React from 'react'
import NavBar from '../../components/user/NavBar'
import Footer from '../../components/user/Footer'
import Banner from '../../components/user/Banner'

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
