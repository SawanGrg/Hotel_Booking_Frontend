import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Profile.css';

export default function Profile() {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showUserBookings, setShowUserBookings] = useState(false);

  useEffect(() => {
    // You can add any initialization logic here
  }, []);

  const showProfile = () => {
    setShowUserProfile(true);
    setShowUserBookings(false);
  };

  const showBooking = () => {
    setShowUserBookings(true);
    setShowUserProfile(false);
  };

  return (
    <div className='pt-20'>

      <div>
        <div className='tabs-details'>
          <button onClick={showProfile}>My Profile</button>
          <button onClick={showBooking}>My Bookings</button>

        </div>

        {showUserProfile && (
          <div className='userProfile'>
            <h1>My Profile</h1>
            <div>
              <h2>Personal Details</h2>
              <div>
                <label>Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Email</label>
                <input type="text" />
              </div>
              <div>
                <label>Phone</label>
                <input type="text" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" />
              </div>
            </div>
            <div>
              <h2>Change Password</h2>
              <div>
                <label>Old Password</label>
                <input type="text" />
              </div>
              <div>
                <label>New Password</label>
                <input type="text" />
              </div>
              <div>
                <label>Confirm Password</label>
                <input type="text" />
              </div>
            </div>
          </div>
        )}

        {showUserBookings && (
          <div>
            <h1>My Bookings</h1>
            <div>
              <h2>Upcoming Bookings</h2>
              <div>
                <h3>Booking 1</h3>
                <div>
                  <label>Hotel Name</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Date</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Time</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Status</label>
                  <input type="text" />
                </div>
              </div>
              <div>
                <h3>Booking 2</h3>
                <div>
                  <label>Hotel Name</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Date</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Time</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Booking Status</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
