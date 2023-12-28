import React from 'react'
import Rooms from '../../components/user/Rooms'
import Banner from '../../components/user/Banner'

export default function Home() {
  return (
    <div>
        <Rooms />
        {/* adding some side panel */}
        <Banner/>
    </div>
  )
}
