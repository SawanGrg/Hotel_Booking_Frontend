import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { postLoginData } from '../../services/user/LoginAPI';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/user/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = 'login';
      const body = {
        username: userName,
        password: password,
      };

      // Call the postLoginData function with the correct arguments
      const response = await postLoginData(endpoint, body);

      if (response.statusCode !== 200) {
        // Server error
        const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      if (response.token) {
        // Token is present, indicating a successful login
        // Dispatch the setUserDetails action to save user data in Redux store and localStorage
        dispatch(setUserDetails({ token: response.token, userData: response.username }));

        // Redirect to the home page
        navigate('/');
      } else {
        // Incorrect username or password
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error(error.message);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <div className="loginPage">
        <div className="loginForm">
          <div className="loginPhoto">
            <img src='assets/cube.avif' alt="Hotel Stupa" />
          </div>
          <div className="login">
            <h2>Welcome to our Annapurna Hotel</h2>
            <h3>
                {error && <div> {error}</div>}
              </h3>
            <form action="" className="form" onSubmit={handleSubmit}>
              <label htmlFor="userName"><h3>Username</h3></label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder='eg : Sxxxx@gmail.com'
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="password"><h3>Password</h3></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='eg : *********'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="" className="forgot">Forgot Password?</a>
              <button type="submit" id="btn">Log In</button>
            </form>
            <div className="policy">

              <p>By continuing, you accept our terms & conditions and our privacy policy.</p>
              <p>Don’t have an account? <a href="">Sign Up</a> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}