import React, { useEffect, useState } from 'react';
import Rooms from '../../components/user/Rooms'
import Banner from '../../components/user/Banner'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/hotel?paramHotelName=${hotelName}&paramHotelLocation=${hotelLocation}`);
  };



  return (
    <div className='pt-40'>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter hotel name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter hotel location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
        />
        <button type="submit">Search Hotels</button>
      </form>

      <Rooms />
      <Banner />
    </div>
  )
}
