import React, { useEffect, useState } from 'react'
import './ViewSpecificUser.css'
import { useNavigate, useParams } from "react-router-dom";
import { getUserBooking } from '../../services/vendor/GetUserBooking';
import GetUserBookingHistory from '../../services/admin/GetUserBookingHistory';
import getAdminUserDetails from '../../services/admin/GetUserDetails';

function ViewSpecificUser() {

    const { userId } = useParams();
    console.log("user id", userId)

    const [bookingDetails, setBookingDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const userBookingDetails = async () => {
            try {
                const response = await GetUserBookingHistory(userId);
                console.log(" user bookin response", response)
                setBookingDetails(response);
            } catch (error) {
                console.error('Error fetching room booking status:', error);
            }
        };

        const userDetail = async () => {
            try {
                const response = await getAdminUserDetails(userId);
                console.log("user details", response.body)
                setUserDetails(response.body);
            } catch (error) {
                console.error('Error fetching room booking status:', error);
            }
        };

        if (userId) {
            userBookingDetails();
            userDetail();
        }
    }, [userId]);

    return (
        <div className='body'> {/* Use the same class 'body' */}
            <div className='room-header'>
                <h1>View User Details</h1>
            </div>

            {/* div for user info */}
            <div>
                <div className='right-profile-holder'>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>User Name:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.username}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>User First Name:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.userFirstName}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>User Last Name:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.userLastName}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>User Contact:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.userPhone}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>Email Address:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.userEmail}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>User Location:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.userAddress}
                        </div>
                    </div>

                    <div className='right-title-holder'>
                        <div className='profile-title-holder'>
                            <h1>Date of Birth:</h1>
                        </div>
                        <div className='dynamic-user-holder'>
                            {userDetails.dateOfBirth}
                        </div>
                    </div>
                </div>
            </div>

            {/* div for showing specific user hotel booking history */}
            <div className='room-history'>
                <div className='room-book-history'>
                    <h1>
                        User Booking History
                    </h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Booked Date </th>
                            <th>Check In Date </th>
                            <th>Check Out Date </th>
                            <th>Booking Status </th>
                            <th> Total Amount </th>
                            <th>Room Name </th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingDetails.map((bookingDetail, index) => (
                            <tr key={index}>
                                <td>{bookingDetail.bookingDate}</td>
                                <td>{bookingDetail.checkInDate}</td>
                                <td>{bookingDetail.checkOutDate}</td>
                                <td>{bookingDetail.status}</td>
                                <td>{bookingDetail.totalAmount}</td>
                                <td>{bookingDetail.hotelRoomName}</td>
                                <td>{bookingDetail.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewSpecificUser