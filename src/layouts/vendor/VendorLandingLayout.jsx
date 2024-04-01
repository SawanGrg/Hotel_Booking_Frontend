import React from 'react'
import VendorNav from '../../components/vendor/VendorNavBar'
import './LandingLayoutCss.css'
export default function VendorLandingLayout({ children }) {
    return (
        <div className='main-layout'>
            <div className='vendor-left-layout'>
                <VendorNav />

            </div>
            <div className='right-layout'>
                {
                    children
                }

            </div>
        </div>
    )
}
