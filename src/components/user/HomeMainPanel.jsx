import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeMainPanel.css';

function HomeMainPanel() {
    const [hotelName, setHotelName] = useState('');
    const [hotelLocation, setHotelLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/hotel?paramHotelName=${hotelName}&paramHotelLocation=${hotelLocation}`);
    };

    return (
        <div className='-index-container'>
            <div className='main-holder'>
                <div>
                    <div className='main-text'>
                        Welcome to Annapurna Hotel Booking
                    </div>
                    <div className='sub-main-text'>
                        Find your perfect hotel with us
                    </div>
                </div>
                <form onSubmit={handleSearch}>
                    <div className='forms'>
                        <div className="input-container">
                            <input
                                className='search-field'
                                placeholder="Enter hotel name"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                            />
                            <input
                                className='search-field'
                                placeholder="Enter hotel location"
                                value={hotelLocation}
                                onChange={(e) => setHotelLocation(e.target.value)}
                            />
                            <div className='button-color'>

                                <button className='button-color' type="submit">Search Hotels</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomeMainPanel;
