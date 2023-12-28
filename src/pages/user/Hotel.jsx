import React, { useEffect, useState } from 'react';
import './Hotel.css';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import BaseUrl from '../../services/BaseUrl';
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';

export default function Hotel() {

  const [hotelData, setHotelData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await getAllHotelData();
        console.log("hotel data :->", data);

        setHotelData(data.body); // Assuming data.body holds the hotel information
      } catch (error) {
        console.error('Error fetching user all hotel data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='main-container'>
      <div className='name'>
        <h1>Hotels Available</h1>
      </div>
      <div className='hotel-main-container'>
        {hotelData.map((hotel) => (
          <div className='hotel-container' key={hotel.hotelPan}>
            <div className='hotel-image'>
              <img src={`${BaseUrl}/images/${hotel.hotelImage}`} alt={hotel.hotelName} />
            </div>
            <div className='hotel-details'>
              <p> Hotel Name</p>
              <h2>{hotel.hotelName}</h2>
             <p> address </p> 
             <h4> {hotel.hotelAddress}</h4>
              <h4> PAN number : {hotel.hotelPan}</h4>
              <h4> Contact : {hotel.hotelContact}</h4>
              {/* Other details you want to display */}
              <div className='explore-button'>
                <Link to={`/hotel/${hotel.hotelId}`}>
                  <button>
                    <span>Explore More</span>
                    <img src="/assets/arrow.png" alt="" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
