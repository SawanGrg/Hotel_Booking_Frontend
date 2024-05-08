import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUserDetails } from "../../redux/user/userSlice";
import { clearUserData } from "../../utils/authStorage";
import { getSpecificUserDetails } from "../../services/user/GetUserDetailsAPI";
import BaseUrl from "../../services/BaseUrl";
import './AdminUpperNavBar.css'

function AdminUpperNavBar() {

    const [showVendorProfile, setShowVendorProfile] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showAdminProfile, setShowAdminProfile] = useState(false);
  
    const tokenFromStorage = localStorage.getItem("role");
    const token = tokenFromStorage ? tokenFromStorage.replace(/['"]+/g, "") : null;

    useEffect(() => {
        if (token == "ROLE_ADMIN") {
          setShowAdminProfile(true);
          setShowUserProfile(false);
          setShowVendorProfile(false);
    
        } else if (token == "ROLE_VENDOR") {
          setShowVendorProfile(true);
          setShowUserProfile(false);
          setShowAdminProfile(false);
        } else {
          setShowUserProfile(true);
          setShowVendorProfile(false);
          setShowAdminProfile(false);
        }
      }, [token]);

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
                    {
                        showAdminProfile && (
                            <Link to="/admin/home" className={`nav ${location.pathname === "/admin" && "active"}`}>
                                Admin
                            </Link>
                        )
                    }
                    {
                        showVendorProfile && (
                            <Link to="/vendor" className={`nav ${location.pathname === "/vendor" && "active"}`}>
                                Vendor
                            </Link>
                        )
                    }
                    
                    <Link to="/hotel" className={`nav ${location.pathname === "/hotel" && "active"}`}>
                        Hotels
                    </Link>
                    <Link to="/blog" className={`nav ${location.pathname === "/blog" && "active"}`}>
                        Blog
                    </Link>
                    <Link to="/contact" className={`nav ${location.pathname === "/contact" && "active"}`}>
                        Contact Us
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

export default AdminUpperNavBar