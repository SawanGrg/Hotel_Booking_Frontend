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
import { CiStar } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHotel } from "react-icons/fa6";

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
  const [hotelStar, setHotelStar] = useState('');
  const [prevHotelStar, setPrevHotelStar] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterHotelStar = () => {
      console.log('hotelStar:', hotelStar);
      try {
        // If the user clicks on the same hotel star, reset the filter and display all hotels
        if (hotelStar === prevHotelStar) {
          const filteredData = hotelData.filter(hotel => hotel.hotelStar == "Null");
          setFilteredData(filteredData);
          setPrevHotelStar('Null');

        } else if (hotelStar == 'All') {
          setFilteredData(hotelData);
        }
        else {
          const filteredData = hotelData.filter(hotel => hotel.hotelStar == hotelStar);
          setFilteredData(filteredData);
          setPrevHotelStar(hotelStar);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    filterHotelStar();
  }, [hotelStar]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (paramHotelName !== null || paramHotelLocation !== null) {
          data = await getAllHotelData(paramHotelName, paramHotelLocation);
          console.log("filter hotel details 1", data)
        } else {
          data = await getAllHotelData(hotelName, hotelLocation);
          console.log("filter hotel details 2", data)
        }
        setHotelData(data.body);
        setFilteredData(data.body);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchData();
  }, [paramHotelName, paramHotelLocation, hotelName, hotelLocation]);

  return (
    <div className='main-container'>

      {/* content parent div */}
      <div className='content-parent-div'>

        {/* div for filter such as from location, hotel name, rating */}
        <div className='parent-filter-container'>

          <div className="filter-text">
            <div>
              <FaFilter className="room-filter-icons" />
            </div>
            <div className="filter-room-title" >
              Filter Hotels
            </div>
          </div>

          <div className='search-hotel-by-name'>
            <div className='hotel-section'>
              <div>
                <FaHotel className="room-filter-icons" />
              </div>
              <div>
                <label>Search Hotel Name</label>
              </div>
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
              <div>
                <IoLocationSharp className="room-filter-icons" />
              </div>
              <div>
                <label>Search Hotel Location</label>
              </div>
            </div>
            <input
              type='text'
              placeholder='Search hotel by location'
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
            />
          </div>

          <div className='search-hotel-by-name'>

            <div className='hotel-section'>
              <label>Hotel Rating</label>
            </div>

            <div className='main-rating'>


              <div className='hotel-rating'>
                <div className='rating-option'>
                  <input
                    type='radio'
                    name='hotelStar'
                    value='1'
                    onChange={(e) => setHotelStar(0)}
                    className="rating-icons radio-input"
                  />
                </div>
                <div>
                  <label>Not Rated</label>
                </div>
              </div>


              {/* first start */}
              <div className='hotel-rating'>
                <div className='rating-option'>
                  <input
                    type='radio'
                    name='hotelStar'
                    value='1'
                    onChange={(e) => setHotelStar(e.target.value)}
                    className="rating-icons radio-input"
                  />
                </div>
                <div>
                  <FaStar
                    className='rating-icons'
                  />
                </div>
              </div>


              <div className='hotel-rating'>
                <div className='rating-option'>
                  <
                    input
                    type='radio'
                    name='hotelStar'
                    value='2'
                    onChange={(e) => setHotelStar(2)}
                    className="rating-icons radio-input"
                  />
                </div>
                <div className='star'>
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                </div>
              </div>

              <div className='hotel-rating'>
                <div className='rating-option'>
                  <
                    input
                    type='radio'
                    name='hotelStar'
                    onChange={(e) => setHotelStar(3)}
                    className="rating-icons radio-input"

                  />
                </div>
                <div className='star'>
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                </div>
              </div>

              <div className='hotel-rating'>
                <div className='rating-option'>
                  <
                    input
                    type='radio'
                    name='hotelStar'
                    value='4'
                    onChange={(e) => setHotelStar(e.target.value)}
                    className="rating-icons radio-input"

                  />
                </div>
                <div className='star'>
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />

                </div>
              </div>

              <div className='hotel-rating'>
                <div className='rating-option'>
                  <
                    input
                    type='radio'
                    name='hotelStar'
                    value='5'
                    onChange={(e) => setHotelStar(5)}
                    className="rating-icons radio-input"

                  />
                </div>
                <div className='star'>
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                  <FaStar
                    className='rating-icons'
                  />
                </div>
              </div>

              <div className='hotel-rating'>
                <div className='rating-option'>
                  <
                    input
                    type='radio'
                    name='hotelStar'
                    value='0'
                    onChange={(e) => setHotelStar('All')}
                    className="rating-icons radio-input"

                  />
                </div>
                <div className='star'>
                  <label>All</label>
                </div>
              </div>


            </div>
          </div>



        </div>

        {/* div for main hotel page */}
        <div className='parent-hotel-container'>
          {filteredData.length === 0 ? (
            <PageNotFound />
          ) : (
            filteredData.map((hotel) => (
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
                      {
                        hotel.hotelStar == 0 ? (
                          <div className='hotelStar'>
                            Not Rated
                          </div>
                        ) : (
                          <div className='hotelStar'>
                            {hotel.hotelStar} Star Hotel
                          </div>
                        )
                      }
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
