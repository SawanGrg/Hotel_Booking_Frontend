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
                    <div className='testimony-content-holder'>
                        <div >
                            "I absolutely love the hotel booking system! It's incredibly user-friendly and efficient. Booking my stays has never been easier. Highly recommended!"
                        </div>
                        <br />
                        <div className=''>
                            <h1>
                            - Shrinkhala Khatriwada
                            </h1>
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
                            <img src='/assets/sisan.png' alt='client' className='testimony-image' />
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
                                - Sisan Baniya
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Testimony