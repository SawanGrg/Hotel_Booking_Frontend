import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <div className='banner-parent-div'>
            {/* div for image */}
            <div className='image-section-banner'>
                <img src='/assets/hotel_image_05.avif' alt='banner' className="banner-image" />
            </div>

            {/* div for content like become a vendor and benefits of becoming a vendor */}
            <div className='banner-content'>

                {/* div for header */}
                <div className="banner-header">
                    Register Today to Become a Vendor
                </div>

                {/* div for benefits of becoming a vendor */}
                <div className="benefits">
                    <h1>Benefits of Becoming a Vendor:</h1>
                    <br />
                    <p>
                        By becoming a vendor, you unlock a world of opportunities. Joining our platform means increased visibility, allowing you to reach a wider audience and attract more customers. Experience business growth as you expand your reach and open doors to new sales opportunities.
                    </p>
                    <br />
                    <p>
                        Moreover, being a vendor offers networking opportunities, connecting you with other vendors and potential partners. Enjoy the flexibility of managing your own schedule and achieving financial independence. Gain access to resources, tools, and support from the platform to further enhance your success as a vendor.
                    </p>
                    <div className="vendor-register">
                        <Link to="/vendorRegistration">
                        <button>
                            <h3>Vendor Registration </h3> <img src="/assets/arrow.png" alt="" />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}
