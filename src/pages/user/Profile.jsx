import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Profile.css';
import toast, { Toaster } from 'react-hot-toast';
import { duration } from '@mui/material';
import { postChangePasswordData } from '../../services/user/PostChangePasswordAPI';
import updateUserDetailsAPI from '../../services/user/PostUserDetailsAPI';

export default function Profile() {

  const [showProfile, setShowProfile] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userDateOfBirth, setUserDateOfBirth] = useState('');
  const [userProfilePic, setUserProfilePic] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {

  }, []);

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowChangePassword(false);
  }

  const handleShowChangePassword = () => {
    setShowProfile(false);
    setShowChangePassword(true);
  }


  const updateProfile = async () => {
    // Create a body object with non-null properties
    const body = {
      userName: userName || '', // Trim if null
      userFirstName: firstName || '', // Trim if null
      userLastName: lastName || '', // Trim if null
      userEmail: userEmail || '', // Trim if null
      userPhone: userPhone || '', // Trim if null
      userAddress: userAddress || '', // Trim if null
      dateOfBirth: userDateOfBirth || '', // Trim if null
    };

    // Call updateUserDetailsAPI with formData
    const res = await updateUserDetailsAPI(body, userProfilePic);

    // Handle response based on status code
    if (res.statusCode === 200) {
      setUserName('');
      setFirstName('');
      setLastName('');
      setUserPhone('');
      setUserEmail('');
      setUserAddress('');
      setUserDateOfBirth('');
      setUserProfilePic('');
      toast.success('Profile Updated Successfully');
    }
    else if (res.statusCode === 400) {
      toast.error('Profile Update Failed');
    }
    else {
      toast.error('Profile Update Failed');
    }
  }


  const changePassword = async () => {

    if (
      oldPassword === '' ||
      newPassword === '' ||
      confirmPassword === '' ||
      oldPassword === undefined ||
      newPassword === undefined ||
      confirmPassword === undefined
    ) {
      return toast.error('Please Enter Password Fields Properly');
    }

    if (
      newPassword.length < 5 &&
      oldPassword.length < 5 &&
      confirmPassword.length < 5
    ) {
      return toast.error('Password Length Should Be Greater Than 5');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New Password And Confirm Password Does Not Match');
    }

    // calling forgot password api
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const res = await postChangePasswordData(data);

    if (res.statusCode == 200) {
      toast.success('Password Changed Successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else if (res.statusCode == 400) {
      toast.error('Password Change Failed');
    } else {
      toast.error('Password Change Failed');
    }

  }

  return (
    <div className='pt-40'>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      {/* conditionally rendering the edit profile and change password */}
      <div className='conditional-rendering'>

        <div className='profile-heading' >
          <button
            onClick={handleShowProfile}
          >
            <span>
              Edit Profile
            </span>
          </button>
        </div>

        <div className='profile-heading'>
          <button
            onClick={handleShowChangePassword}
          >
            <span>
              Change Password
            </span>
          </button>
        </div>

      </div>

      {showProfile && (
        // edit your profile
        <div className='second-div'>

          {/* for username, first name, last name, user phone */}
          <div>

            {/* for username */}
            <div className='second-inner-element-div'>
              <label>
                Enter your username
              </label>
              <br />
              <input
                type="text"
                placeholder='Enter Your New User Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className='second-inner-element-div'>
              <label>
                Enter your user first name
              </label>
              <br />
              <input
                type="text"
                placeholder='Enter Your New First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='second-inner-element-div'>
              <label>
                Enter your user last name
              </label>
              <br />
              <input
                type="text"
                placeholder='Enter Your New Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className='second-inner-element-div'>
              <label>
                Enter your user phone
              </label>
              <br />
              <input
                type="phone"
                placeholder='Enter Your New Phone'
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div className='second-inner-element-div'>
              <label>
                Enter your user email
              </label>
              <br />
              <input
                type="email"
                placeholder='Enter Your New Email'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>

          {/* for profile pic, user email, user address, user date of birth */}
          <div>
            <div className='second-inner-element-div'>
              <label htmlFor="userProfilePic">Upload Your Profile Picture</label>
              <br />
              <input
                type="file"
                id="userProfilePic"
                onChange={(e) => setUserProfilePic(e.target.files[0])}
                className="image-input-field"
              />
            </div>


            <div className='second-inner-element-div'>
              <label>
                Enter your user address
              </label>
              <br />
              <input
                type="text"
                placeholder='Enter Your New Address'
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </div>

            <div className='second-inner-element-div'>
              <label>
                Enter your user date of birth
              </label>
              <br />
              <input
                type="date"
                value={userDateOfBirth}
                onChange={(e) => setUserDateOfBirth(e.target.value)}
              />
            </div>

            <div className='second-inner-element-div'>
              <button
                onClick={updateProfile}
                className='update-profile-button'
              >
                Update Profile
              </button>
            </div>
          </div>


        </div>
      )
      }

      {showChangePassword && (
        <div className='third-div'>
          <div className='third-length-div'>

            <div className='change-password-label'>
              Change Your Profile Password
            </div>

            <div className='change-password-div'>

              <div className='change-password-label'>
                Old Password
              </div>

              <div className='input-field-container'>
                <input
                  type="text"
                  placeholder='Enter Old Password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input-field"
                />
              </div>

            </div>

            <div className='change-password-div'>

              <div className='change-password-label'>
                New Password
              </div>
              <div className='input-field-container'>
                <input
                  type="password"
                  placeholder='Enter New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className='change-password-div'>
              <div className='change-password-label'>
                Confirm Password
              </div>
              <div className='input-field-container'>
                <input
                  type="password"
                  placeholder='Enter Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>



            <div className='change-password-div'>

              <button
                onClick={changePassword}
                className='change-password-button'
              >
                Change Password
              </button>
          </div>
        </div>
      </div>
      )
      }
    </div>
  );
}
