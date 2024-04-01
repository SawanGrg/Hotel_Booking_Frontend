import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './VendorRegistration.css';
import { postVendorRegisterData } from '../../services/vendor/PostVendorRegister';

const steps = [
    'Vendor Details',
    'Hotel Details',
    'Final Step',
];

const FirstPage = ({ onNext, onUpdateVendorDetails }) => {
    const [vendorDetails, setVendorDetails] = useState({
        userName: '',
        password: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPhone: '',
        userAddress: '',
        dateOfBirth: ''
    });

    const [userImage, setUserImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
        onUpdateVendorDetails(vendorDetails); // Update parent state
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserImage(file); // Update userImage state
        onUpdateVendorDetails({ ...vendorDetails, userImage: file }); // Update parent state with user image
    };


    return (
        <div className="step-container">
            <h1>Vendor Details</h1>
            <div>
                <label>Username:</label>
                <input className='vendor-password' type="text" name="userName" value={vendorDetails.userName} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <br />
                <input className='vendor-password' type="password" name="password" value={vendorDetails.password} onChange={handleChange} />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" name="userFirstName" value={vendorDetails.userFirstName} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="userLastName" value={vendorDetails.userLastName} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input className="vendor-password" type="email" name="userEmail" value={vendorDetails.userEmail} onChange={handleChange} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" name="userPhone" value={vendorDetails.userPhone} onChange={handleChange} />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="userAddress" value={vendorDetails.userAddress} onChange={handleChange} />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input className="vendor-password" type="date" name="dateOfBirth" value={vendorDetails.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
                <label>User Image:</label>
                <input type="file" onChange={handleImageChange} />
            </div>
            <br />
            <div className="vendor-register-button">
                <Button variant="contained" onClick={onNext}>Next</Button>
            </div>
        </div>
    );
}

const SecondPage = ({ onBack, onNext, onUpdateHotelDetails }) => {
    const [hotelDetails, setHotelDetails] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelContact: '',
        hotelEmail: '',
        hotelPan: '',
        hotelDescription: '',
    });

    const [hotelImage, setHotelImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
        onUpdateHotelDetails(hotelDetails); // Update parent state
    };

    // Inside SecondPage component
    const handleHotelImageChange = (e) => {
        const file = e.target.files[0];
        setHotelImage(file); // Update hotelImage state
        onUpdateHotelDetails({ ...hotelDetails, hotelImage: file }); // Update parent state with hotel image
    };


    return (
        <div className="step-container">
            <h1>Hotel Details</h1>
            <div>
                <label>Hotel Name:</label>
                <input type="text" name="hotelName" value={hotelDetails.hotelName} onChange={handleChange} />
            </div>
            <div>
                <label>Hotel Address:</label>
                <input type="text" name="hotelAddress" value={hotelDetails.hotelAddress} onChange={handleChange} />
            </div>
            <div>
                <label>Hotel Contact:</label>
                <input type="text" name="hotelContact" value={hotelDetails.hotelContact} onChange={handleChange} />
            </div>
            <div >
                    <label >Hotel  Description</label>
                    <textarea type='text' name='hotelDescription' value={hotelDetails.hotelDescription} onChange={handleChange} />
            </div>
            <div>
                <label>Hotel Email:</label>
                <input className="vendor-password" type="email" name="hotelEmail" value={hotelDetails.hotelEmail} onChange={handleChange} />
            </div>
            <div>
                <label>Hotel PAN:</label>
                <input type="text" name="hotelPan" value={hotelDetails.hotelPan} onChange={handleChange} />
            </div>
            <div>
                <label>Hotel Image:</label>
                <input type="file" onChange={handleHotelImageChange} />
            </div>
            <br />
            <div className='second-next-button'>
                <Button variant="contained" onClick={onBack}>Back</Button>
                <Button variant="contained" onClick={onNext}>Next</Button>
            </div>
        </div>
    );
}


const ThirdPage = ({ onBack, userDetails, hotelDetails }) => {
    const policyText = "By registering as a vendor, you agree to abide by our terms and conditions. These terms include policies related to pricing, quality of service, and adherence to local regulations. Violation of these policies may result in account suspension or termination. For more details, please refer to our vendor agreement.";

    const [finalUserImage, setFinalUserImage] = useState(userDetails.userImage); // Initialize with user image from userDetails
    const [finalHotelImage, setFinalHotelImage] = useState(hotelDetails.hotelImage); // Initialize with hotel image from hotelDetails

    const postHotelDetails = async () => {
        // Post hotel details to the server
        console.log('Hotel details posted successfully');
        console.log(userDetails, hotelDetails, finalUserImage, finalHotelImage);

        const response = await postVendorRegisterData(userDetails, finalUserImage, hotelDetails, finalHotelImage);
        console.log(response);

    }

    return (
        <div className="step-container">
            <div className='success-message'>
                <h1>Your registration marks you as a vendor.</h1>
            </div>
            <div className='final-register'>
                <img src='/assets/success-register.jpg' alt='success' style={{ width: '60%', height: '60%' }} />
            </div>
            <div className='policy-text'>
                {policyText}
            </div>
            <div className='button-container'>
                <Button variant="contained" onClick={onBack}>Back</Button>
                <Button variant="contained" onClick={postHotelDetails}>Submit</Button>
            </div>
        </div>
    );
}



function VendorRegistration() {

    const [currentStep, setCurrentStep] = useState(1);
    const [vendorDetails, setVendorDetails] = useState({
        userName: '',
        password: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPhone: '',
        userAddress: '',
        dateOfBirth: '',
        userImage: null,
    });
    const [hotelDetails, setHotelDetails] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelContact: '',
        hotelEmail: '',
        hotelPan: '',
        hotelImage: null,
    });

    const [userImage, setUserImage] = useState(null);
    const [hotelImage, setHotelImage] = useState(null);

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const onUpdateVendorDetails = (details) => {
        setVendorDetails(details);
    };

    const onUpdateHotelDetails = (details) => {
        setHotelDetails(details);
    };


    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FirstPage onNext={handleNext} onUpdateVendorDetails={onUpdateVendorDetails} />;
            case 2:
                return <SecondPage onBack={handleBack} onNext={handleNext} onUpdateHotelDetails={onUpdateHotelDetails} />;
            case 3:
                return <ThirdPage onBack={handleBack} userDetails={vendorDetails} hotelDetails={hotelDetails} />;
            default:
                return null;
        }
    };

    return (
        <div className='vendor-registration-holder'>
            <div className=''>
                <img src='/assets/vendor-register.avif' alt='vendor-registration' />
            </div>
            <Box>
                <div className='semi-holder'>
                    <Stepper activeStep={currentStep - 1} sx={{ mb: 1, ml: 12 }}>
                        {steps.map((label, index) => (
                            <Step key={label} sx={{ mr: 18 }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="step-content">
                        {renderStep()}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default VendorRegistration;
