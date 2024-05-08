import React, { useEffect, useState } from 'react'
import './VendorUpperNavBar.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUserDetails } from "../../redux/user/userSlice";
import { clearUserData } from "../../utils/authStorage";
import { getSpecificUserDetails } from "../../services/user/GetUserDetailsAPI";
import BaseUrl from "../../services/BaseUrl";


function VendorUpperNavBar() {

    const vendorToken = localStorage.getItem("role").replace(/['"]+/g, '');

    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (vendorToken == "ROLE_VENDOR") {
            setShowProfile(true);
        }
    }, [vendorToken]);


    const selector = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const location = useLocation();

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutSubmit = async (e) => {
        dispatch(clearUserDetails());
        clearUserData();
        navigate("/login");
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getSpecificUserDetails();
                setUserDetails(response);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [selector]);

    return (
        <div>
            <header className="navbar">
                <div className="left">Annapurna</div>
                <nav className="right">
                    <Link to="/" className={`nav ${location.pathname === "/" && "active"}`}>
                        Home
                    </Link>
                    <Link to="/vendor" className={`nav ${location.pathname === "/vendor" && "active"}`}>
                        Vendor 
                    </Link>
                    <Link to="/hotel" className={`nav ${location.pathname === "/hotel" && "active"}`}>
                        Hotels
                    </Link>
                    <Link to="/contact" className={`nav ${location.pathname === "/contact" && "active"}`}>
                        Contact
                    </Link>
                    <Link to="/blog" className={`nav ${location.pathname === "/blog" && "active"}`}>
                        Blog
                    </Link>
                    <Link to="/profile" className={`nav ${location.pathname === "/about" && "active"}`}>
                        Profile
                    </Link>
                    
                    {/* {selector && (
                        <span className="nav" onClick={logoutSubmit}>
                            Logout
                        </span>
                    )} */}
                </nav>
                {selector ? (
                    <div className="nav" onClick={toggleDropdown}>
                        {userDetails ? (
                            <img
                                src={`${BaseUrl}${userDetails.userProfilePicture}`}
                                className="profile-pic"
                                alt="Profile"
                            />
                        ) :
                            <>
                                Register
                            </>}
                    </div>
                ) : (
                    <Link to="/login" className={`nav ${location.pathname === "/login" && "active"}`}>
                        Login
                    </Link>
                )}

                <div className="hamburger" onClick={toggleMobileNav}>
                    <div className={`bar1 ${isMobileNavOpen ? "animateBar1" : ""}`}></div>
                    <div className={`bar2 ${isMobileNavOpen ? "animateBar2" : ""}`}></div>
                    <div className={`bar3 ${isMobileNavOpen ? "animateBar3" : ""}`}></div>
                </div>
            </header>
        </div>
    )
}

export default VendorUpperNavBar