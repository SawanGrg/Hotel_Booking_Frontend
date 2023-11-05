import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const selector = useSelector((state) => state.user.userData);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div>
      {/* for the web browser view */}
      <header className="navbar">
        <div className="left">Annapurna</div>
        <nav className="right">
          <div>
            <h2>{selector == null ? "" : "Welcome " + selector  }</h2>
          </div>

          <Link to="/" className="nav active">
            Home
          </Link>
          <Link to="/About" className="nav">
            About
          </Link>
          <Link to="/Blog" className="nav">
            Blog
          </Link>
          <Link to="/Gallery" className="nav">
            Gallery
          </Link>
          <Link to="/Contact" className="nav">
            Contact
          </Link>
          <Link to="/Login" className="nav">
            Login
          </Link>
          <a href="https://www.facebook.com/" className="nav">
            <img src="/assets/facebook.png" alt="facebook" />
          </a>
          <a href="https://www.instagram.com/" className="nav">
            <img src="/assets.insta_icon.png" alt="instagram" />
          </a>
          <a href="https://www.tripadvisor.com/" className="nav">
            <img src="/assets/trip.png" alt="tripadvisor" />
          </a>
        </nav>

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
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>

        <a href="https://www.instagram.com/">
          <img src="/assets/insta_icon.png" alt="instagram" />
        </a>
        <a href="https://www.facebook.com/">
          <img src="/assets/facebook.png" alt="facebook" />
        </a>
        <a href="https://www.tripadvisor.com/">
          <img src="/assets/trip.png" alt="tripadvisor" />
        </a>
      </nav>
    </div>
  );
}