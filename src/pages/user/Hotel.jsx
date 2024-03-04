import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Hotel.css';
import { Link } from 'react-router-dom';
import BaseUrl from '../../services/BaseUrl';
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';
import { getHotelDetails } from '../../services/user/GetDynamicFilter';
import PageNotFound from '../../components/user/PageNotFound';
import { set } from 'react-hook-form';

export default function Hotel() {


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramHotelName = searchParams.get('paramHotelName');
  const paramHotelLocation = searchParams.get('paramHotelLocation');

  console.log('paramHotelName: from com', paramHotelName);
  console.log('paramHotelLocation: from com', paramHotelLocation);


  const [hotelData, setHotelData] = useState([]);

  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [userRating, setUserRating] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('hotelName: hhehe', paramHotelName);
        console.log('hotelLocation: heheh', paramHotelLocation);
        const data = await getHotelDetails(paramHotelName, paramHotelLocation);
        setHotelData(data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchData();
  }, [paramHotelName, paramHotelLocation]); // Include dependencies here

  return (
    <div className='main-container'>

      {/* div for title */}
      <div className='name'>
        <h1>Hotels Available</h1>
      </div>

      {/* content parent div */}
      <div className='content-parent-div'>

        {/* div for filter such as from location, hotel name, rating */}
        <div className='parent-filter-container'>

          <div className='hotel-filter-text'>
            <h3>Filter To Your Need</h3>
          </div>

          <div className='search-hotel-by-name'>
            <div className='hotel-name'>
              <label>Hotel Name</label>
            </div>
            <input
              type='text'
              placeholder='Search hotel by name'
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>

          <div className='search-hotel-by-name'>
            <div className='hotel-name'>
              <label>Hotel Location</label>
            </div>
            <input
              type='text'
              placeholder='Search hotel by location'
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
            />
          </div>

        </div>

        {/* div for hotel details */}
        <div className='hotel-main-container'>
          {hotelData.length === 0 ? (
            <PageNotFound />
          ) : (
            hotelData.map((hotel) => (
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
                  <div className='explore-button'>
                    <Link to={`/hotel/${hotel.hotelId}`}>
                      <button>
                        <span>Explore More</span>
                        <img src='/assets/arrow.png' alt='' />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>



    </div>
  );
}
