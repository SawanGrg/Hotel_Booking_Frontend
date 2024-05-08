import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './UserRegistration.css'
import toast, { Toaster } from 'react-hot-toast'
import { postUserRegistrationData } from '../../services/user/PostUserRegistration'
import { postUserOTPData } from '../../services/user/PostUserOTPAPI'

function UserRegistration() {

  const navigate = useNavigate()

  const errors = {};

  const [showRegisterPage, setShowRegisterPage] = useState(true)
  const [showOTPPage, setShowOTPPage] = useState(false)

  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [userDateOfBirth, setUserDateOfBirth] = useState('')
  const [userProfileImage, setUserProfileImage] = useState(null)

  const postUserInfo = async () => {

    const userData = {
      userFirstName,
      userLastName,
      userEmail,
      password: userPassword,
      userPhone,
      userAddress,
      userName,
      dateOfBirth: userDateOfBirth
    }

    const userProfilePicture = userProfileImage

    //validation
    if (!userFirstName.trim()) {
      toast.error('First Name is required')
      return;
    }else if (userFirstName.length < 3) {
      toast.error('First Name must be at least 3 characters long')
      return;
    }
    if (!userLastName.trim()) {
      toast.error('Last Name is required')
      return;
    }

    if (!userEmail.trim()) {
      toast.error('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      toast.error('Email is invalid');
      return;
    }
    if (!userName.trim()) {
      toast.error('User Name is required');
      return;
    }else if (userName.length < 3) {
      toast.error('User Name must be at least 3 characters long')
      return;
    }

    
    if (!userProfilePicture) {
      toast.error('Profile Picture is required')
      return;
    }
    
    
    if (!userPassword.trim()) {
      toast.error('Password is required');
      return;
    }else if (userPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return;
    }


    try {

      const response = await postUserRegistrationData(userData, userProfilePicture)
      console.log("User Registration Response: ", response)

      if (response.message == "User already exist") {
        toast.error('User already exists')
        return
      }

      if (response.status == "OK") {
        // redirect to opt div 
        setShowRegisterPage(false)
        setShowOTPPage(true)
      } else {
        // show error message in toaster

      }

    } catch (error) {
      console.error("Error in User Registration: ", error)
    }
  }

  const [otp, setOtp] = useState('')
  const [otpResponse, setOtpResponse] = useState([])

  const hitOtpAPI = async () => {

    if (!otp.trim()) {
      toast.error('OTP is required')
      return;
    }
    // hit the otp api
    const response = await postUserOTPData(otp)
    console.log("OTP Response: ", response)

    if (response.statusCode == "200") {
      // redirect to login page
      navigate('/login')
    } else {
      // show error message in toaster
    }
  }




  return (
    <div className='register-parent'>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
      {
        showOTPPage ? (
          <div className='otp-div'>
            <div className='otp-title'>
              Enter the OTP sent to your email
            </div>
            <div>
              <img
                src='/assets/user-otp.avif'
                alt='otp'
                className='otp-image'
              />
            </div>
            <div className='otp-info'>
              Please enter the OTP within 5 minutes
            </div>
            <br />
            <div className='otp-input-div'>
              <input
                type='text'
                placeholder='Enter OTP'
                className='otp-input'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className='otp-button-div'>
              <div>
                <button
                  onClick={hitOtpAPI}
                  className='otp-register-button'
                >
                  Verify OTP
                </button>
              </div>
            </div>


          </div>
        ) : (

          <div className='user-form-parent'>

            {/* welcome div */}
            <div className='user-header'>
              Welcome to Annapurna Hotel Booking System
            </div>


            {/* div for form */}
            <div className='form-holder'>
              {/* first grid */}
              <div className='first-last-name-div'>
                <div>
                  <label className='user-label'>First Name</label>
                  <input
                    type='text'
                    placeholder='First Name'
                    className='user-input'
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className='user-label'>Last Name</label>
                  <input
                    type='text'
                    placeholder='Last Name'
                    className='user-input'
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                  />
                </div>

              </div>

              {/* second grid */}
              <div>
                <div>
                  <label className='user-label'>Email</label>
                  <input
                    type='text'
                    placeholder='eg : sxxx@gxxx.com'
                    className='user-input'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* third div */}
              <div className='first-last-name-div'>

                <div>
                  <label className='user-label'>User Name</label>
                  <input
                    type='text'
                    placeholder='User Name'
                    className='user-input'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div>
                  <label className='user-label'>Password</label>
                  <input
                    type='text'
                    placeholder='Password'
                    className='user-input'
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* fourth div */}
              <div>
                <div>
                  <label className='user-label'>Phone</label>
                  <input
                    type='text'
                    placeholder='Phone'
                    className='user-input'
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* fifth div */}
              <div>
                <div>
                  <label className='user-label'>Address</label>
                  <input
                    type='text'
                    placeholder='Address'
                    className='user-input'
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* sixth div */}
              <div>
                <div>
                  <label className='user-label'>Date of Birth</label>
                  <input
                    type='text'
                    placeholder='Date of Birth'
                    className='user-input'
                    value={userDateOfBirth}
                    onChange={(e) => setUserDateOfBirth(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* image div */}
              <div>
                <div>
                  <label className='user-label'>Profile Image</label>
                  <input
                    type='file'
                    className='user-input'

                    onChange={(e) => setUserProfileImage(e.target.files[0])}
                    required
                  />
                </div>
              </div>

            </div>

            {/* div for some info */}
            <div className='register-contract'>
              By creating an account, you agree to our <span class="underline">terms and conditions</span> and <span class="underline">privacy policy</span>.
            </div>

            <div className='login-redirect'>
              {/* div for button */}
              <div>
                <button
                  type='submit'
                  className='user-register-button'
                  onClick={postUserInfo}
                >
                  Register
                </button>
              </div>

              {/* div for login redirect */}
              <div>
                <div className='register-contract'>
                  Already have an account? <Link to='/login' className='login-link'><span class="underline">Login</span></Link>
                </div>
              </div>
            </div>


          </div>
        )
      }


      {/* for user register image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

          alt='user-register'
          className='user-register-image'
        />
      </div>

    </div>
  )
}

export default UserRegistration