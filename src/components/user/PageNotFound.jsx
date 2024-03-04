import React from 'react'
import './PageNotFound.css'

function PageNotFound() {
  
  return (
    <div>
      {/* for image */}
        <div className='imageStyle'>
          <img src='/assets/NoRecord.jpg' alt='PageNotFound' />
        </div>
        {/* go back to home */}
        <div className='returnHome'>
                <a href='/'>Back to Home</a>
        </div>



    </div>
  )
}

export default PageNotFound