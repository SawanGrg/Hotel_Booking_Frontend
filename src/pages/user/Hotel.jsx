import React, { useEffect } from 'react';
import './Hotel.css';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function Hotel() {
  const hotelId = '1234';
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VmVuZG9yIiwiZXhwIjoxNzAyNTIwMzk2LCJpYXQiOjE3MDI0ODQzOTZ9.TGWQbSARtzRgd60C0DQ2rI-qu7WCpmVoaZQflHT1dfk';

  useEffect(() => {
    const user = jwtDecode(token); // Pass the token variable here
    console.log(user);
  }, []); // Empty dependency array for running the effect once on mount

  return (
    <div className='main-container'>
      <div className='name'>
        <h1>Hotels Available</h1>
      </div>
      <div className='hotel-main-container'>
        <div className='hotel-container'>
          <div className='hotel-image'>
            <img src='/assets/standard.jpeg' alt='' />
          </div>
          <div className='hotel-details'>
            <h2>Annapurna Hotel</h2>
            <h4>Pokhara, Lakeside</h4>
            <h5>Starting From NPR 500</h5>
            <div className='explore-button'>
              <Link to={`/hotel/${hotelId}`}>
                <button>
                  <span>Explore More</span>
                  <img src="/assets/arrow.png" alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
