import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

export default function PageNotFound() {

    const style = {
        width: '80%',
        height: '90%',
        Padding: '0px 0px 0px 0px'
    }
    return (
        <div className='pagenotfound'>
            <div className='return'>
                <div className='pagenotfound-header'>
                    Oops! Something's Missing
                </div>
                <br     />
                <div>
                    It seems the page you are looking for is not available or doesnot exist.
                </div>
                <div className="page-buttton">
                        <Link to="/">
                        <button>
                            <h3>Back to home  </h3> <img src="/assets/arrow.png" alt="" />
                        </button>
                        </Link>
                    </div>
            </div>
            <div>
                <img src='/assets/PageNotFoundImage.jpg' alt='Page Not Found' 
                style={style}
                />
            </div>
        </div>
    )
}
