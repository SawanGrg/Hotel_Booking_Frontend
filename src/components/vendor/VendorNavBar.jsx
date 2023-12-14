import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VendorNavbarCss.css';

const VendorNav = () => {
    const [showMenu, setShowMenu] = useState(false);

    function displayPages() {
        setShowMenu(!showMenu); // Toggles the state to show/hide the menu
    }

    return (
        <div>
            <div className="main">
                <div className="nav-main-container">
                    <div className="nav-left-container">
                        <h4>Welcome Vendor</h4>
                    </div>
                    <nav className="nav-right-container">
                        <Link to="/vendor" className="nav-dashboard">
                            <div className="nav-item">Dashboard</div>
                        </Link>
                        <Link to="/addrooms" className="nav-add-rooms">
                            <div className="nav-item">Add Rooms</div>
                        </Link>
                        <Link to="/rooms" className="nav-view-rooms">
                            <div className="nav-item">View Rooms</div>
                        </Link>
                        <Link to="#" className="nav-booking">
                            <div className="nav-item">View Bookings</div>
                        </Link>
                        <Link to="#" className="nav-logout">
                            <div className="nav-item">Logout Panel</div>
                        </Link>
                    </nav>
                </div>
            </div>
            {/* responsive navbar */}
            <div className='res-nav'>
                <div className="res-nav-left-container">
                    <h4>Welcome Vendor</h4>
                </div>
                <div>
                    <button className='res-nav-btn' onClick={displayPages}>Menu</button>
                </div>
                {/* <div className='res-positioning'> */}
                    {showMenu && (
                        <div className="res-positioning">
                            <div className="res-nav-right-container">
                            <Link to="/vendor" className="res-nav-dashboard">
                                <div className="res-nav-item">Dashboard</div>
                            </Link>
                            <Link to="/addrooms" className="res-nav-add-rooms">
                                <div className="res-nav-item">Add Rooms</div>
                            </Link>
                            <Link to="/rooms" className="res-nav-view-rooms">
                                <div className="res-nav-item">View Rooms</div>
                            </Link>
                            <Link to="#" className="res-nav-booking">
                                <div className="res-nav-item">View Bookings</div>
                            </Link>
                            <Link to="#" className="res-nav-logout">
                                <div className="res-nav-item">Logout Panel</div>
                            </Link>
                            </div>
                        </div>

                    )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default VendorNav;
