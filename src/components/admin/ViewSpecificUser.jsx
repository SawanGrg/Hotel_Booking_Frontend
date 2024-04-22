import React, { useEffect, useState } from 'react'
import './ViewSpecificUser.css'
import { useNavigate, useParams } from "react-router-dom";
import { getUserBooking } from '../../services/vendor/GetUserBooking';
import GetUserBookingHistory from '../../services/admin/GetUserBookingHistory';
import getAdminUserDetails from '../../services/admin/GetUserDetails';
import BaseUrl from '../../services/BaseUrl';
import GetSpecificHotel from '../../services/admin/GetSpecificHotel';
import PostVerifyVendor from '../../services/admin/PostVerifyVendor';
import toast, { Toaster } from 'react-hot-toast';

function ViewSpecificUser() {

    const { userId } = useParams();
    console.log("user id", userId)

    const [bookingDetails, setBookingDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [authority, setAuthority] = useState([]);
    const [hotelDetails, setHotelDetails] = useState([]);

    const fetchData = async () => {
        try {
            const bookingResponse = await GetUserBookingHistory(userId);
            console.log("Booking response:", bookingResponse);
            setBookingDetails(bookingResponse);

            const userDetailsResponse = await getAdminUserDetails(userId);
            console.log("User details:", userDetailsResponse.body);
            setUserDetails(userDetailsResponse.body);

            if (userDetailsResponse.body && userDetailsResponse.body.authorities && userDetailsResponse.body.authorities.length > 0) {
                const userAuthority = userDetailsResponse.body.authorities[0].authority;
                setAuthority(userAuthority);

                if (userAuthority === "ROLE_VENDOR") {
                    console.log("User is a vendor");
                    const res = await GetSpecificHotel(userId);
                    console.log("Hotel details:", res);
                    setHotelDetails(res);


                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const verifyVendor = async () => {
        try {
            const response = await PostVerifyVendor(userId, "VERIFIED");
            console.log("Response from verify vendor:", response);
            toast.success("Vendor verified successfully");
            fetchData();
        }
        catch (error) {
            console.error('Error verifying vendor:', error);
            toast.error("Error verifying vendor");
        }
    }



    return (
        <div className='body'>
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 3000,
                }}
            />

            <div className='room-header'>
                <h1>View User Details</h1>
            </div>

            {/* div for user info */}
            <div>
                <div className='user-grid-holder'>
                    <div>
                        <div className='admin-first-div'>
                            <img
                                src={`${BaseUrl}${userDetails.userProfilePicture}`}
                                className="admin-profile-pic"
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div>
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
                                <h1>Email Address:</h1>
                            </div>
                            <div className='dynamic-user-holder'>
                                {userDetails.userEmail}
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
                    </div>
                    <div>
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

                        {authority.length > 0 && authority === "ROLE_VENDOR" && userDetails.userStatus === "PENDING" && (
                            <div>
                                <div className='profile-title-holder'>
                                    <h1>Do you want to verify vendor:</h1>
                                </div>
                                <button onClick={verifyVendor}>Verify Vendor</button>
                            </div>
                        )}





                    </div>
                </div>
            </div>

            {
                authority.length > 0 && authority === "ROLE_VENDOR" && (

                    <div>
                        <div className='room-header'>
                            <h1>View Hotel Details</h1>
                        </div>

                        <div>
                            <div className='user-grid-holder'>
                                <div>
                                    <div className='admin-first-div'>
                                        <img
                                            src={`http://localhost:8080/images/${hotelDetails.hotelImage}`}
                                            className="admin-profile-pic"
                                            alt="Hotel"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel Name:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelName}
                                        </div>
                                    </div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel PAN:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelPan}
                                        </div>
                                    </div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel Email:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelEmail}
                                        </div>
                                    </div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel Contact:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelContact}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel Address:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelAddress}
                                        </div>
                                    </div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Hotel Description:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.hotelDescription}
                                        </div>
                                    </div>
                                    <div className='right-title-holder'>
                                        <div className='profile-title-holder'>
                                            <h1>Registered Date:</h1>
                                        </div>
                                        <div className='dynamic-user-holder'>
                                            {hotelDetails.createdAt}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



            {/* div for showing specific user hotel booking history */}
            <div className='room-history'>
                <div className='room-book-history'>
                    <h1>
                        User Booking History
                    </h1>
                </div>

                {
                    bookingDetails.length == 0 ? (
                        <div className='admin-specific-user'>
                            <thead>
                                <tr className='admin-specific-user'>
                                    <th className='some-padding'>Booked Date </th>
                                    <th className='some-padding'>Check In Date </th>
                                    <th className='some-padding'>Check Out Date </th>
                                    <th className='some-padding'>Booking Status </th>
                                    <th className='some-padding'> Total Amount </th>
                                    <th className='some-padding'>Room Name </th>
                                    <th className='some-padding'>Payment</th>
                                </tr>
                            </thead>
                        </div>
                    ) : (
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
                    )
                }
            </div>
        </div>
    )
}

export default ViewSpecificUser