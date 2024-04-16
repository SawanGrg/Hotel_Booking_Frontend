import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Profile.css';
import toast, { Toaster } from 'react-hot-toast';
import { duration } from '@mui/material';
import { postChangePasswordData } from '../../services/user/PostChangePasswordAPI';
import updateUserDetailsAPI from '../../services/user/PostUserDetailsAPI';

import { FaUser } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiBookBookmarkFill } from "react-icons/pi";

import { getSpecificUserDetails } from '../../services/user/GetUserDetailsAPI';
import BaseUrl from '../../services/BaseUrl';
import { getUserBookingDetails } from '../../services/user/GetUserBookingDetails';

export default function Profile() {

  const mainUserName = localStorage.getItem('userData').replace(/['"]+/g, '');


  const [showUserProfile, setShowViewUserProfile] = useState(true);
  const [showEditUserProfile, setShowEditUserProfile] = useState(false);
  const [showChangePassword, setShowViewChangePassword] = useState(false);
  const [showUserBookingDetails, setShowUserBookingDetails] = useState(false);

  const changeState1 = () => {
    setShowViewChangePassword(false);
    setShowEditUserProfile(false);
    setShowViewUserProfile(true);
    setShowUserBookingDetails(false);
  };

  const changeState2 = () => {
    setShowEditUserProfile(true);
    setShowViewChangePassword(false);
    setShowViewUserProfile(false);
    setShowUserBookingDetails(false);
  };

  const changeState3 = () => {
    setShowEditUserProfile(false);
    setShowViewChangePassword(true);
    setShowViewUserProfile(false);
    setShowUserBookingDetails(false);
  };

  const changeState4 = () => {
    setShowEditUserProfile(false);
    setShowViewChangePassword(false);
    setShowViewUserProfile(false);
    setShowUserBookingDetails(true);
  };



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

  const [userBookingDetails, setUserBookingDetails] = useState([]);

  const setValues = async () => {
    const response = await getSpecificUserDetails();
    console.log("user details from the server in user profile", response);
    // Set user details into state
    setUserName(response.username);
    setFirstName(response.userFirstName);
    setLastName(response.userLastName);
    setUserPhone(response.userPhone);
    setUserEmail(response.userEmail);
    setUserAddress(response.userAddress);
    setUserDateOfBirth(response.dateOfBirth);
    // Assuming you have a separate API call to get user profile picture
    setUserProfilePic(response.profilePicture); // Adjust this line according to your API response
  };

  useEffect(() => {
    setValues();
  }, [showUserProfile, showEditUserProfile]);

  const viewUserProfile = async () => {
    const response = await getUserBookingDetails();
    console.log("user booking details from the server ", response);
    // Set user details into state
    setUserBookingDetails(response);
  };

  useEffect(() => {
    viewUserProfile();
  }, [showUserBookingDetails]);




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
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className='profile-image-holder'>
        <div className='image-middle-div'>
          <div className='flex flex-col'>
            <img
              src={`https://source.unsplash.com/200x200/?portrait`}
              className="profile-pic"
              alt="Profile"
            />
          </div>
          <div className='profile-title'>
            {mainUserName}
          </div>
        </div>
      </div>
      {/* div for user profile image */}
      <div className='profile-image'>
        {/* You can add your image here */}
      </div>
      {/* div for user real div */}
      <div className='user-info'>
        {/* div for side bar */}
        <div className='sidebar'>

          <div className='side-bar-info'>
            <div>
              <FaUser className='side-bar-icons' />
            </div>
            <div className='side-bar-title'>
              User Name
            </div>
          </div>
          <div className='side-bar-info'>

            <div>

              <MdPreview className='side-bar-icons' />
            </div>
            <div
              className='side-bar-title'
              onClick={changeState1}
            >

              View Profile
            </div>
          </div>
          <div className='side-bar-info'>

            <div>

              <FiEdit className='side-bar-icons' />
            </div>
            <div
              className='side-bar-title'
              onClick={changeState2}
            >

              Edit Profile
            </div>
          </div>

          {/* for change password button */}
          <div className='side-bar-info'>

            <div>

              <RiLockPasswordFill className='side-bar-icons' />
            </div>
            <div
              className='side-bar-title'
              onClick={changeState3}>

              Change Password
            </div>
          </div>

          {/* for user can view their button */}
          <div className='side-bar-info'>

            <div>
              <PiBookBookmarkFill className='side-bar-icons' />
            </div>
            <div
              className='side-bar-title'
              onClick={changeState4}>

              My Bookings
            </div>
          </div>

        </div>
        {/* div for right bar */}
        <div className='rightbar'>

          {/* default: showing the view div */}
          {showUserProfile && (
            <div>
              <div className='right-title' >
                User Profile
              </div>

              <div className='right-profile-holder'>

                <div>
                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> User Name:  </h1>
                    </div>

                    <div className='dynamic-user-holder'>

                      {userName}
                    </div>
                  </div>

                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> User First Name:  </h1>
                    </div>

                    {firstName}
                  </div>

                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> User Last Name:  </h1>
                    </div>

                    {lastName}
                  </div>

                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> User Contact:  </h1>
                    </div>

                    {userPhone}
                  </div>
                </div>

                <div>
                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> Email Address:  </h1>
                    </div>

                    {userEmail}
                  </div>
                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> User Location:  </h1>
                    </div>

                    {userAddress}
                  </div>
                  <div className='right-title-holder'>

                    <div className='profile-title-holder'>

                      <h1> Date of Birth:  </h1>
                    </div>

                    {userDateOfBirth}
                  </div>

                </div>

              </div>
            </div>
          )}


          {/* showing edit page if user clicks on the edit profile div */}
          {
            showEditUserProfile &&
            <div>
              <div className='right-title' >
                Edit Profile
              </div>
              <div className='user-profile-second-div'>
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
                      className='user-update-field'
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
                      className='user-update-field'

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
                      className='user-update-field'

                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
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
                      className='user-update-field'
                      onChange={(e) => setUserDateOfBirth(e.target.value)}
                    />
                  </div>


                </div>


              </div>
            </div>
          }


          {/* showing change passwod if user clicks on the change password div */}
          {showChangePassword &&
            <div className='third-div'>
              <div className='third-length-div'>

                <div className='right-title' >
                  Change Password
                </div>
                <br />

                <div className='change-password-div'>

                  <div className='change-password-label'>
                    Old Password
                  </div>

                  <div className='input-field-container'>
                    <input
                      placeholder='Enter Old Password'
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="forgot-input-field"
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
                      className="forgot-input-field"
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
                      className="forgot-input-field"
                    />
                  </div>
                </div>



                <div className='change-password-div'>

                  <button
                    onClick={changePassword}
                    className='update-profile-button'
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          }

          {
            showUserBookingDetails &&
            <div className='user-profile-fourth-div'>
              <div className='right-title'>
                My Bookings
              </div>
              <div className='user-dynamic-data-holder'>
                <div className='scrollable-booking-details'>
                  <table>
                    <thead>
                      <tr>
                        <th>Room Name</th>
                        <th>Room Category</th>
                        <th>Room Bed</th>
                        <th>Room Price</th>
                        <th>Room Status</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Booking Date</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookingDetails.map(booking => (
                        <tr key={booking.bookingId}>
                          <td>{booking.hotelRoom.roomNumber}</td>
                          <td>{booking.hotelRoom.roomCategory}</td>
                          <td>{booking.hotelRoom.roomBed}</td>
                          <td>{booking.hotelRoom.roomPrice}</td>
                          <td>{booking.hotelRoom.roomStatus}</td>
                          <td>{booking.checkInDate}</td>
                          <td>{booking.checkOutDate}</td>
                          <td>{booking.bookingDate}</td>
                          <td>{booking.status}</td>
                          <td>{booking.paymentMethod}</td>
                          <td>{booking.totalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
              </div>
          }




            </div>
      </div>
      </div>
      );
}  