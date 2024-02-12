import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { clearUserDetails } from "../../redux/user/userSlice";
import { clearUserData } from "../../utils/authStorage";
import { getSpecificUserDetails } from "../../services/user/GetUserDetailsAPI";
import BaseUrl from "../../services/BaseUrl";

export default function NavBar() {
  const selector = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        setUserDetails(response.body);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [selector]);

  return (
    <div>
      {/* for the web browser view */}
      <header className="navbar">
        <div className="left">Annapurna</div>
        <nav className="right">

          <Link to="/" className="nav active">
            Home
          </Link>
          <Link to="/hotel" className="nav">
            Hotels
          </Link>
          <Link to="/Blog" className="nav">
            Blog
          </Link>
          {
            selector ?
            <Link to="/profile" className="nav">
              Profile
            </Link>
            : null
          }
          {
            selector ?
            <Link to="/user-booking" className="nav">
              Bookings
            </Link>
            : null
          }
          {
          selector ? 
          ( // If user data exists, show logout link
            <span className="nav" onClick={logoutSubmit}>
              Logout
            </span>
          ) : null
          }
        </nav>
        {selector ? (
            <div className="nav" onClick={toggleDropdown}>
              {userDetails ? (
                <img
                  src={`${BaseUrl}${userDetails.userProfilePicture}`}
                  className="profile-pic"
                  alt="Profile"
                />
              ) : null}
              
            </div>
          ) : (
            <Link to="/Login" className="nav">
              Login
            </Link>
          )}

        <div className="hamburger" onClick={toggleMobileNav}>
          <div className={`bar1 ${isMobileNavOpen ? "animateBar1" : ""}`}></div>
          <div className={`bar2 ${isMobileNavOpen ? "animateBar2" : ""}`}></div>
          <div className={`bar3 ${isMobileNavOpen ? "animateBar3" : ""}`}></div>
        </div>
      </header>

      {/* for responsive */}
      <nav className={`mobileNav ${isMobileNavOpen ? "openDrawer" : ""}`}>
        {/* Replace anchor tags with Link components */}
        <Link to="/home" className="active">
          Home
        </Link>
        <Link to="/hotel">hotel</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>

      </nav>
    </div>
  );
}
