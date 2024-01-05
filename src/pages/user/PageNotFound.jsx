import React from 'react';
import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <div className='pagenotfound'>
            <div className='word'>
                404
            </div>
            <div>
                Page Not Found
            </div>
            <div className='return'>
                <a href='/'>Back to Home</a>
            </div>
        </div>
    )
}
