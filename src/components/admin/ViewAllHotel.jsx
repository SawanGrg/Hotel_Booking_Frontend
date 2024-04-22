import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewAllHotel.css';
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';
import { FaEye } from "react-icons/fa";
import { getAllHotel } from '../../services/admin/GetAllHotel';

function ViewAllHotel() {

    const [hotelList, setHotelList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    async function fetchHotelData() {
        try {
            const hotelData = await getAllHotel();
            setHotelList(hotelData.body);
            setFilteredData(hotelData.body);
            console.log("all Hotel Data:", hotelData.body);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    useEffect(() => {
        fetchHotelData();
    }, []);

    return (
        <div className='body'>
            <div className='room-header'>
                <h1>View All Hotels</h1>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Hotel Name</th>
                            <th>Hotel Address</th>
                            <th>Contact</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((hotel, index) => (
                            <tr key={index}>
                                <td>{hotel.hotelName}</td>
                                <td>{hotel.hotelAddress}</td>
                                <td>{hotel.hotelContact}</td>
                                <td>{hotel.hotelDescription}</td>
                                <td>{hotel.hotelEmail}</td>
                                <td>{hotel.hotelStatus}</td>
                                <td>
                                    <button>
                                        <Link to={`/admin/viewSpecificHotel/${hotel.hotelId}`}>
                                            <div className='making'>
                                                <div>
                                                    <FaEye className='icons' />
                                                </div>
                                                <div>
                                                    View
                                                </div>
                                            </div>
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAllHotel;
