import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="description">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                    nesciunt odio eos, quod dolores rerum voluptatum porro neque alias
                    fugiat nam temporibus quia enim ea numquam vel voluptates suscipit
                    iure.
                </p>
            </div>
            <div className="footerLink">
                <div className="quickLink">
                    <h3>QUICK LINK</h3> <br/>
                    <p><Link to="/home" className="active">Home</Link></p>
                    <p><Link to="/blog">Blog</Link></p>
                    <p><Link to="/gallery">Gallery</Link></p>
                    <p><Link to="/login">Login</Link> </p>
                </div>
                <div className="contactUs">
                    <h3>CONTACT US</h3>
                    <p>Ramghat, Pokhara, Nepal</p>
                    <p>example@gmail.com</p>
                    <p>+977 9876543210</p>
                </div>
                <div className="followUs">
                    <h3>FOLLOW US</h3>
                    <a href="https://www.facebook.com/">
                        <img src="/assets/facebook.png" alt="facebook" className="facebook" />
                    </a>
                    
                    <a href="https://www.instagram.com/">
                        <img
                            src="/assets/insta_icon.png"
                            alt="instagram"
                            className="instagram"
                        />
                    </a>
                </div>
                <div className="availableIn">
                    <h3>AVAILABLE IN</h3> 
                    {/* <a href="https://www.apple.com/app-store/">
                        <img src="/assets/apple.jpg" alt="applestore" />
                    </a>
                    <a href="https://play.google.com/">
                        <img src="/assets/google.jpg" alt="playstore" />
                    </a> */}
                </div>
            </div>
        </div>
    );
}
