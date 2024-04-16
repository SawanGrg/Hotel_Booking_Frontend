import React, { useState, useEffect } from 'react';
import './SpecificUserBooking.css';
import { useParams } from 'react-router-dom';
import toast, { Toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { getUserBooking } from '../../services/vendor/GetUserBooking';
import BaseUrl from '../../services/BaseUrl';
import { PostUpdateBooking } from '../../services/vendor/PostUpdateBooking';

function SpecificUserBooking() {
  const { bookingId, userId } = useParams();

  const [userData, setUserData] = useState([]);

  // Assume `initialStatus` is your initial state value
  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    // Update the status state based on the selected option
    if (event.target.value == "") {
      return
    }
    setStatus(event.target.value);
  };
  const fetchUserBooking = async () => {
    try {
      const data = await getUserBooking();
      console.log("all user booking", data);
      // Convert bookingId to a number for comparison
      const filteredData = data.filter((booking) => parseInt(booking.bookingId) === parseInt(bookingId));
      console.log("filtered specific user booking", filteredData);
      setUserData(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postUpdateBooking = async () => {
    if (status == ""){
      return
    }
    try {
      console.log('hitting the update booking status' , bookingId, userId, status)
      const res = await PostUpdateBooking({ bookingId, userId, status });
      console.log("response from postUpdateBooking", res);
      toast.success("Successfully Updated Booking Status");
      fetchUserBooking();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() =>{
    postUpdateBooking();
  }, [status]);

  useEffect(() => {
    fetchUserBooking();
  }, [bookingId]);


  return (
    <div>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className='room-header'>
        <h1>Verify User Booking</h1>
      </div>
      {/* Render userData */}
      {userData.map((booking) => (
        <div key={booking.bookingId} className='vendor-booking-main-holder'>
          <div className="vendor-user-details">
            <div className='vendor-user-grid'>
              <div className='vendor-first-main-div'>
                {/* User Details */}
                <div className='vendor-first-div'>
                  <img
                    src={`${BaseUrl}${booking.user.userProfilePicture}`}
                    className="vendor-profile-pic"
                    alt="Profile"
                  />
                </div>
                <div>
                  <div className='vendor-booking-title'>
                    Name of Person:
                  </div>
                  <div className='vendor-booking-details'>
                    {booking.user.userFirstName} {booking.user.userLastName}
                  </div>
                  <div className='vendor-booking-title'>
                    Phone :
                  </div>
                  <div>
                    {booking.user.userPhone}
                  </div>
                  <div className='vendor-booking-title'>
                    Email:
                  </div>
                  <div>
                    {booking.user.userEmail}
                  </div>
                  <div className='vendor-booking-title'>
                    Address:
                  </div>
                  <div>
                    {booking.user.userAddress}
                  </div>
                </div>
                <div>
                  <div className='vendor-booking-title'>Username:</div>
                  <div>{booking.user.username}</div>
                  <div className='vendor-booking-title'>User Status:</div>
                  <div>{booking.user.userStatus}</div>
                  <div className='vendor-booking-title'>
                    Created At:
                  </div>
                  <div>
                    {new Date(booking.user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Hotel Room Details */}
              <div className="room-details">
                <div className='vendor-first-div'>
                  <img
                    src={`${BaseUrl}/images/${booking.hotelRoomImage}`}
                    className="vendor-profile-pic"
                    alt={`${booking.hotelRoomImage}`}
                  />
                </div>
                <div>
                  <div className='vendor-booking-title'>
                    Hotel Room Category:
                  </div>
                  <div>
                    {booking.roomType}
                  </div>
                  <div className='vendor-booking-title'>
                    Room Bed Category:
                  </div>
                  <div>
                    {booking.bedCategory}
                  </div>
                  <div className='vendor-booking-title'>
                    Room Type:
                  </div>
                  <div>
                    {booking.roomType}
                  </div>
                  <div className='vendor-booking-title'>
                    Room Price:
                  </div>
                  <div>
                    {booking.roomPrice}
                  </div>
                  {/* Add more room details as needed */}
                </div>

                <div>
                  <div className='vendor-booking-title'>
                    Has AC :
                  </div>
                  <div>
                    {booking.hasAC ? 'Yes' : 'No'}
                  </div>
                  <div className='vendor-booking-title'>
                    Has TV :
                  </div>
                  <div>
                    {booking.hasTV ? 'Yes' : 'No'}
                  </div>
                  <div className='vendor-booking-title'>
                    Has WiFi :
                  </div>
                  <div>
                    {booking.hasWiFi ? 'Yes' : 'No'}
                  </div>
                  <div className='vendor-booking-title'>
                    Has Balcony :
                  </div>
                  <div>
                    {booking.hasBalcony ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* div for booking details */}
          <div className="booking-details">
            <div className='room-header'>
              <h1>Room Booking Details</h1>
            </div>
            <div className="vendor-user-booking-details">
              <div>
                <div className='vendor-booking-title'>
                  Booking ID:
                </div>
                <div>
                  {booking.bookingId}
                </div>
              </div>
              <div>
                <div className='vendor-booking-title'>
                  Check-in Date
                </div>
                <div>
                  {booking.checkInDate}
                </div>
              </div>
              <div>
                <div className='vendor-booking-title'>
                  Check-out Date
                </div>
                <div>
                  {booking.checkOutDate}
                </div>
              </div>
              <div>
                <div className='vendor-booking-title'>
                  Payment Method:
                </div>
                <div>
                  {booking.paymentMethod}
                </div>
              </div>
              <div>
                <div className='vendor-booking-title'>
                  Booking Date:
                </div>
                <div className='vendor-booking-details'>
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </div>
              </div>
              <div className='modifying'>
                <div className='vendor-booking-title'>
                  Total Amount:
                </div>
                <div className='vendor-booking-details'>
                  {booking.totalAmount}
                </div>
              </div>
              <div className='modifying'>
                <div className='vendor-booking-title'>
                  Booking Status
                </div>
                <div className='vendor-booking-details'>
                  {booking.status}
                </div>
              </div>


              {/* button  */}
{
        booking.vendorUpdated == false &&
              <div className='modifying'>
                <div className='vendor-booking-title'>
                  Update Booking Status
                </div>
                <div className='vendor-booking-details'>
                  <select value={""} onChange={handleStatusChange}>
                    <option value="">Select Status</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="REFUNDED">Refunded</option>
                    <option value="PENDING">Pending</option>
                    <option value="BOOKED">Booked</option>
                  </select>
                </div>
              </div>
      }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecificUserBooking;
