import React, { useEffect, useState } from 'react';
import './VendorBookingPage.css';
import toast, { Toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { getUserBooking } from '../../services/vendor/GetUserBooking';
import { Link } from 'react-router-dom';


function VendorBookingPage() {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchUserBooking = async () => {
        try {
            const data = await getUserBooking();
            setUserData(data);
            // Initially, display all bookings
            setFilteredData(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUserBooking();
    }, []);

    // Function to filter data based on booking status
    const filterDataByStatus = (status) => {
        const filtered = userData.filter(booking => booking.status == status);
        setFilteredData(filtered);
    };


    return (
        <div>
            <div className='body'>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 3000,
                    }}
                />
            </div>
            <div className='room-header'>
                <h1>View All Booking</h1>
            </div>

            <div className="vendor-booking-filter">

                <div className='vendor-first-filter'>

                    {/* Button to filter pending bookings */}
                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => filterDataByStatus('PENDING')}>
                            View Pending Booking
                        </div>
                    </div>

                    {/* Button to filter cancelled bookings */}
                    <div className='vendor-individual-filter' >

                        <div className='filter-button' onClick={() => filterDataByStatus('CANCELLED')}>
                            View Cancelled Booking
                        </div>
                    </div>

                    {/* Button to filter cancelled bookings */}
                    <div className='vendor-individual-filter' >

                        <div className='filter-button' onClick={() => filterDataByStatus('REFUNDED')}>
                            View Refunded Booking
                        </div>
                    </div>

                    {/* Button to filter cancelled bookings */}
                    <div className='vendor-individual-filter' >

                        <div className='filter-button' onClick={() => filterDataByStatus('BOOKED')}>
                            View Booked Booking
                        </div>
                    </div>
                </div>

                {/* search filter */}
                <div>
                    <div className='vendor-second-filter'>
                    <input type="text" placeholder="Search by User Name" 
                    onChange={(e) => 
                        { 
                            const searchValue = e.target.value;
                            setFilteredData(
                            userData.filter(booking => booking.user.username.toLowerCase().includes(searchValue.toLowerCase()))) 
                        }
                    } 
                    />
                    </div>
                </div>
            </div>

            {/* div for tabular format */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Booked Date</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>Total Amount </th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.totalAmount}</td>
                                <td>{booking.user.username}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <Link to={`/vendor/booking/${booking.bookingId}/${booking.user.userId}`}>
                                        <div>
                                            <button>Verify Booking</button>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VendorBookingPage;
