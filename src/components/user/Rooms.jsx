import React, { useEffect, useState } from 'react';
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';
import './Rooms.css';
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidContact } from 'react-icons/bi';
import { MdDescription } from 'react-icons/md';
import { Link } from 'react-router-dom'; 
import BaseUrl from '../../services/BaseUrl';


export default function Rooms() {
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const fetchDataFromHomePage = async () => {
      try {
        const data = await getAllHotelData();
        setHotelData(data.body);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchDataFromHomePage();
  }, []);

  return (
    <div className="container">
      <div className="room">
        <h1>Hotels</h1>
      </div>
      <div className="rooms">
        {hotelData.map((hotel) => (
          <Link to={`/hotel/${hotel.hotelId}`} key={hotel.hotelId}> {/* Move Link here */}
            <div className="room-grid" key={hotel.hotelId}>
              <img
                  id="room-photo" 
                  src={`${BaseUrl}/images/${hotel.hotelImage}`}
                  alt={hotel.hotelName} 
                  />
              <div className="hotel-name">
                <h2>{hotel.hotelName}</h2>
              </div>
              <div className="room-detail">
                {/* Render hotel location */}
                <div className='hotel-location'>
                  <div className='aligning'>
                    <FaLocationDot /> Hotel Location:
                  </div>
                  <div>
                    {hotel.hotelAddress}
                  </div>
                </div>

                {/* render hotel contact */}
                <div className='hotel-location'>
                  <div className='aligning'>
                    <BiSolidContact /> Hotel Contact:
                  </div>
                  <div>
                    {hotel.hotelContact}
                  </div>
                </div>

                {/* render hotel amenities */}
                {/* <div className='hotel-location'>
                  <div className='aligning'>
                    <MdDescription /> Hotel Description:
                  </div>
                  <div>
                    {hotel.hotelDescription}
                  </div>
                </div> */}
              </div>
              <div className="room-detail">
                <button>
                  <h3>Explore More</h3> <img src="/assets/arrow.png" alt="" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
