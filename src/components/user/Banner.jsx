import React from 'react'
import './Banner.css'

export default function Banner() {
    return (
        <div className='banner-parent-div'>
            <div className='image-section-banner'>
                <a href='https://en.wikipedia.org/wiki/Ghandruk'>
                <img
                    src='/assets/ghandruk village.jpg'
                    alt="banner"
                    className='banner-image'
                
                />
                </a>
                <a href='https://en.wikipedia.org/wiki/Ghandruk'>
                <img
                    src='/assets/pokhara.jpg'
                    alt="banner"
                    className='banner-image'
                />
                </a>
                <a href='https://en.wikipedia.org/wiki/Ghandruk'>
                <img
                    src='/assets/buddha.avif'
                    alt="banner"
                    className='banner-image'
                />
                </a>
            </div>
        </div>
    )
}
