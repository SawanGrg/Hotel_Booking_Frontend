import React, { useEffect, useState } from 'react';
import './VendorBookingPage.css';
import toast, { Toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { getUserBooking } from '../../services/vendor/GetUserBooking';


function VendorBookingPage() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserBooking();
    }, []);

    const fetchUserBooking = async () => {
        try {
            const data = await getUserBooking();
            setUserData(data);
        } catch (error) {
            toast.error(error.message); 
        }
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>User Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.roomNumber}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.userName}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VendorBookingPage;
