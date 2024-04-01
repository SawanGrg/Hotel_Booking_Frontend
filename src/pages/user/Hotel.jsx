import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Hotel.css';
import { Link } from 'react-router-dom';
import BaseUrl from '../../services/BaseUrl';
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';
import { getHotelDetails } from '../../services/user/GetDynamicFilter';
import PageNotFound from '../../components/user/PageNotFound';
import { set } from 'react-hook-form';
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { MdRoomService } from "react-icons/md";


export default function Hotel() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramHotelName = searchParams.get('paramHotelName');
  const paramHotelLocation = searchParams.get('paramHotelLocation');

  console.log('paramHotelName: from com', paramHotelName);
  console.log('paramHotelLocation: from com', paramHotelLocation);


  //used for the api data
  const [hotelData, setHotelData] = useState([]);

  // used for filter such as hotel name, location, rating
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');

  useEffect(() => {
    const fetchDataFromHomePage = async () => {
      try {
        const data = await getAllHotelData(paramHotelName, paramHotelLocation);
        setHotelData(data.body);
      } catch (error) {
        console.error('Error fetching hotel data: from search hitting', error);
      }
    };

    fetchDataFromHomePage();
  }, [paramHotelName || paramHotelLocation]);

  useEffect(() => {
    const fetchDataFromThisPage = async () => {
      try {
        const data = await getAllHotelData(hotelName, hotelLocation);
        setHotelData(data.body);
      } catch (error) {
        console.error('Error fetching hotel data: from search hitting', error);
      }
    };

    fetchDataFromThisPage();
  }, [hotelName || hotelLocation]);

  return (
    <div className='main-container'>

      {/* content parent div */}
      <div className='content-parent-div'>

        {/* div for filter such as from location, hotel name, rating */}
        <div className='parent-filter-container'>

          <div className='hotel-filter-text'>
            <h3>Filter To Your Need</h3>
          </div>

          <div className='search-hotel-by-name'>
            <div className='hotel-section'>
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
            <div className='hotel-section'>
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

        {/* div for main hotel page */}
        <div className='parent-hotel-container'>
          {hotelData.length === 0 ? (
            <PageNotFound />
          ) : (
            hotelData.map((hotel) => (
              <Link to={`/hotel/${hotel.hotelId}`} key={hotel.hotelId}>
                <div className='hotel-details-holder' key={hotel.hotelId}>
                  {/*  div for hotel image */}
                  <div className='hotel-image-container'>
                    <img
                      src={`${BaseUrl}/images/${hotel.hotelImage}`}
                      alt='hotel'
                      className='hotel-image'
                    />
                  </div>

                  {/* div for hotel details such as name, location, contact */}
                  <div className='second-div'>

                    {/* for hotel name */}
                    <div>
                      <h1>{hotel.hotelName}</h1>
                    </div>

                    {/* for hotel location */}
                    <div className='second-div-content'>
                      <FaLocationDot
                        className='react-icons'
                      />
                      Location : {hotel.hotelAddress}
                    </div>

                    {/* for hotel contact */}
                    <div className='second-div-content'>
                      <BiSolidContact
                        className='react-icons'
                      />
                      Contact : {hotel.hotelContact}
                    </div>

                    {/* hotel description */}
                    <div className='second-div-content'>
                      <div>

                        {/* <MdDescription
                className='descripton-react-icons'
                /> */}
                      </div>
                      {hotel.hotelDescription}
                    </div>


                  </div>


                  {/* div for average review, Amenties provided, highest and lowest price */}
                  <div className='second-third-div'>
                    {/* div for average review */}
                    <div className='third-div-content'>
                      <FaStar
                        className='react-icons'
                      />
                      Average Review : 4.5
                    </div>

                    {/* div for hotel amenties */}
                    <div className='third-div-content'>
                      <MdRoomService
                        className='react-icons'
                      />
                      Amenties Provided:
                    </div>

                    <div className='amenties-list'>
                      <ul>
                        {hotel.hasWifi && <li>Free Wifi</li>}
                        {hotel.hasFridge && <li> Room with Mini Fridge</li>}
                        {hotel.hasAC && <li> Room with Air Condition</li>}
                        {hotel.hasTV && <li>Room with Television</li>}
                        {hotel.hasBalcony && <li>Room with Balcony</li>}
                      </ul>
                    </div>


                  </div>
                </div >
              </Link>
            )))}
        </div>



      </div>



    </div>
  );
}
