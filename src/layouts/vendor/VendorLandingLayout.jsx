import React from 'react'
import VendorNav from '../../components/vendor/VendorNavBar'
import './LandingLayoutCss.css'
import VendorUpperNavBar from '../../components/vendor/VendorUpperNavBar'
export default function VendorLandingLayout({ children }) {
    return (
        <div className='vendor-parent'>
            <div>
                <VendorUpperNavBar />
            </div>
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
        </div>
    )
}
