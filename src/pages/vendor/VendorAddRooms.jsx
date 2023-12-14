import React, { useState } from 'react';
import { postRoomData } from '../../services/vendor/AddRoomAPI';
import './VendorAddRooms.css';

function VendorAddRooms() {

    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomCategory, setRoomCapacity] = useState('');
    const [roomBed, setRoomBed] = useState('');

    const [roomPrice, setRoomPrice] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const [roomImage, setRoomImage] = useState('');

    const [roomImage1, setRoomImage1] = useState('');
    const [roomImage2, setRoomImage2] = useState('');
    const [roomImage3, setRoomImage3] = useState('');

    const [roomStatus, setRoomStatus] = useState('');

    const [hasAC, setHasAC] = useState('');
    const [hasWifi, setHasWifi] = useState('');
    const [hasTV, setHasTV] = useState('');
    const [hasBalcony, setHasBalcony] = useState('');
    const [hasRefridge, setHasRefridge] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const roomData = {
            roomNumber,
            roomType: roomType.toUpperCase(), // Convert roomType value to uppercase
            roomCategory: roomCategory.toUpperCase(), // Convert roomCategory value to uppercase
            roomBed: roomBed.toUpperCase(), // Convert roomBed value to uppercase
            roomPrice,
            roomDescription,
            roomImage,
            roomStatus,
            hasAC: hasAC,
            hasWifi,
            hasTV,
            hasBalcony,
            hasRefridge: hasRefridge,
        };
        const mainRoomImage = roomImage;

        try {
            const data = await postRoomData(roomData, mainRoomImage, roomImage1, roomImage2, roomImage3);
            console.log('Room added successfully:', data);
            setSuccess('Room added successfully.');
            setError('');
        } catch (error) {
            // Handle error and set error state
            console.error('Error adding room:', error);
            setError('Error adding room. Please try again.');
            setSuccess('');
        }
    }
    const convertToBoolean = (value) => {
        if (value === "true") {
            return true;
        } else {
            return false;
        }

    };
    return (
        <div>
            <div className='header'>
                <h1>Hotel Add Rooms</h1>
            </div>

            {/* Display error message if error state is not empty */}
            {error && <div className="error">{error}</div>}
            {/* Display success message if success state is not empty */}
            {success && <div className="success">{success}</div>}
            <div className='body'>
                <form className='form-input' onSubmit={handleSubmit}>
                    <div className='form-sections'>
                        <div className='form-section'>

                            <label htmlFor="roomNumber">
                                Room Number:
                            </label>
                            <br />
                            <div className='input-styling'>
                                <input
                                    type="text"

                                    name="roomNumber"
                                    placeholder='eg : 101'
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                />
                            </div>
                            <br />
                            <label htmlFor="roomType">
                                Room Type:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="roomType"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <option value="">Select Room Type</option>
                                <option value="Standard">Standard</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Business">Business</option>
                            </select>
                            <br />
                            <label htmlFor="roomCategory">
                                Room Category:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="roomCategory"
                                value={roomCategory}
                                onChange={(e) => setRoomCapacity(e.target.value)}
                            >
                                <option value="">Select Room Category</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Triple">Triple</option>
                                <option value="Quad">Quad</option>
                                <option value="Queen">Queen</option>
                                <option value="King">King</option>
                            </select>
                            <br />
                            <label htmlFor="roomBed">
                                Room Bed:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="roomBed"
                                value={roomBed}
                                onChange={(e) => setRoomBed(e.target.value)}
                            >
                                <option value="">Select Room Bed</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Triple">Triple</option>
                                <option value="Quad">Quad</option>
                                <option value="Queen">Queen</option>
                                <option value="King">King</option>
                            </select>
                            <br />
                            <label htmlFor="roomPrice">
                                Room Price:
                            </label>
                            <br />
                            <div className='input-styling'>
                                <input
                                    type="text"
                                    name="roomPrice"
                                    placeholder='eg : 1000'
                                    value={roomPrice}
                                    onChange={(e) => setRoomPrice(e.target.value)}
                                />
                            </div>
                            <br />
                            <label htmlFor="roomDescription">
                                Room Description:
                            </label>
                            <br />
                            <div className='input-styling'>
                                <input
                                    type="text"
                                    name="roomDescription"
                                    placeholder='eg : This is a room with a view'
                                    value={roomDescription}
                                    onChange={(e) => setRoomDescription(e.target.value)}
                                />
                            </div>
                            <br />
                            <label htmlFor="roomStatus">
                                Room Status:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="roomStatus"
                                value={roomStatus}
                                onChange={(e) => setRoomStatus(e.target.value)}
                            >
                                <option value="">Select Room Status</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className='image-section'>
                            <label htmlFor="hasAc">
                                Has AC:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="hasAC"
                                value={hasAC}
                                onChange={(e) => setHasAC(convertToBoolean(e.target.value))}
                            >
                                <option value="">Select AC condition</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <br />
                            <label htmlFor="hasWifi">
                                Has Wifi:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="hasWifi"
                                value={hasWifi}
                                onChange={(e) => setHasWifi(convertToBoolean(e.target.value))}
                            >
                                <option value="">Select Wifi condition</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <br />
                            <label htmlFor="hasTV">
                                Has TV:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="hasTV"
                                value={hasTV}
                                onChange={(e) => setHasTV(convertToBoolean(e.target.value))}
                            >
                                <option value="">Select TV condition</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <br />
                            <label htmlFor="hasBalcony">
                                Has Balcony:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="hasBalcony"
                                value={hasBalcony}
                                onChange={(e) => setHasBalcony(convertToBoolean(e.target.value))}
                            >
                                <option value="">Select Balcony condition</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <br />
                            <label htmlFor="hasRefridge">
                                Has Refrigerator:
                            </label>
                            <br />
                            <select
                                className='select-styling'
                                name="hasRefridge"
                                value={hasRefridge}
                                onChange={(e) => setHasRefridge(convertToBoolean(e.target.value))}
                            >
                                <option value="">Select Refrigerator condition</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>

                            <br />

                            <label htmlFor="roomImage">
                                Room Main Image:
                            </label>

                            <input
                                type="file"
                                name="roomImage"
                                onChange={(e) => setRoomImage(e.target.files[0])} // Use e.target.files to get the selected file
                            />
                            <br />
                            <label htmlFor="roomImage">
                                Side Room Image 1 :
                            </label>
                            <input
                                type="file"
                                name="roomImage"
                                onChange={(e) => setRoomImage1(e.target.files[0])} // Use e.target.files to get the selected file
                            />

                            <br />
                            <label htmlFor="roomImage">
                                Side Room Image 2:
                            </label>
                            <input
                                type="file"
                                name="roomImage"
                                onChange={(e) => setRoomImage2(e.target.files[0])} // Use e.target.files to get the selected file

                            />
                            <br />
                            <label htmlFor="roomImage">
                                Side Room Image 3:
                            </label>
                            <input
                                type="file"
                                name="roomImage"
                                onChange={(e) => setRoomImage3(e.target.files[0])} // Use e.target.files to get the selected file

                            />
                            <div className='button'>
                                <button type="submit" id="btn">Add Room</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default VendorAddRooms;
