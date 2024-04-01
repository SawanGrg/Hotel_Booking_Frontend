import React, { useState, useEffect } from 'react';
import './Testimony.css';



function Testimony() {
    return (
        <div className='testimony-parent'>

            {/* div for heading */}
            <div className='testimony-header-holder'>
                CLIENTS TESTIMONIALS
            </div>

            {/* div for client testimony */}

            <div className='testimony-container'>
                <div className='testimony-holder'>
                    {/* client testimony */}
                    <div >
                        <div className='testimony-content-holder'>
                            "I've been using the hotel booking system for quite some time now, and I must say it's incredibly efficient and user-friendly. Booking a room is just a few clicks away, and the interface is intuitive. It's made managing my hotel stays a breeze!"
                        </div>
                        <br />
                        <div className='testimony-author'>
                            <h1>- John Smith</h1>
                        </div>
                    </div>

                    {/* testimonial image */}
                    <div className='testimony-user-image'>
                        <div>
                            <img src='/assets/testimony-client-1.jpg' alt='client' className='testimony-image' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='testimony-container'>
                <div className='testimony-holder'>
                    {/* testimonial image */}
                    <div className='testimony-user-image' >
                        <div >
                            <img src='/assets/testimony-client-2.jpg' alt='client' className='testimony-image' />
                        </div>
                    </div>
                    {/* client testimony */}
                    <div className='testimony-content-holder'>
                        <div >
                            "I absolutely love the hotel booking system! It's incredibly user-friendly and efficient. Booking my stays has never been easier. Highly recommended!"
                        </div>
                        <br />
                        <div className=''>
                            <h1>
                                - Stephan Curry
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Testimony