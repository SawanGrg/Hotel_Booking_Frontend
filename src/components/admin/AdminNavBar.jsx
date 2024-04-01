import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './AdminNavBarCSS.css';

import { FaCirclePlus } from "react-icons/fa6";
import { BiSolidHotel } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";






function AdminNavBar() {
    const [showMenu, setShowMenu] = useState(false);

    function displayPages() {
        setShowMenu(!showMenu); // Toggles the state to show/hide the menu
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        window.location.href = "/vendor";
    }

    return (
        <div>
            <div className="main">
                <div className="nav-main-container">
                    <div className="nav-left-container">
                        <h4>Admin Panel</h4>
                    </div>
                    <nav className="nav-right-container">
                        <Link to="/admin/home" className="nav-dashboard">
                            <div className="nav-item">
                                <TbDeviceAnalytics className='vendor-icons' />
                                Analytics</div>
                        </Link>
                        <Link to="/admin/user" className="nav-add-rooms">
                            <div className="nav-item">
                                {/* <FaCirclePlus className='vendor-icons'/> */}
                                <FaUser  className='user-icons' />

                                All User
                            </div>
                        </Link>
                        <Link to="/admin/vendor" className="nav-view-rooms">
                            <div className="nav-item">
                                <FaBuildingUser className='vendor-icons' />
                            All Vendor
                            </div>
                        </Link>

                        <Link to="/admin/viewAllReport" className="nav-booking">
                            <div className="nav-item">
                                {/* <FaBookmark className='vendor-icons' /> */}
                                <MdOutlineReport className='vendor-icons' />
                                Vendor Issue</div>
                        </Link>
                        <Link className="nav-logout" onClick={handleLogout}>
                            <div className="nav-item">
                                <IoIosLogOut className='vendor-icons' />
                                Log out
                            </div>
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
                                <div className="res-nav-item">Rooms</div>
                            </Link>
                            <Link to="#" className="res-nav-booking">
                                <div className="res-nav-item">Bookings</div>
                            </Link>
                            <Link to="#" className="res-nav-logout">
                                <div className="res-nav-item">Log out</div>
                            </Link>
                        </div>
                    </div>

                )}
                {/* </div> */}
            </div>
        </div>
    )
}

export default AdminNavBar