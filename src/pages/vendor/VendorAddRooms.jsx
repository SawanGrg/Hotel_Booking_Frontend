import React, { useState } from 'react';
import { postRoomData } from '../../services/vendor/AddRoomAPI';
import './VendorAddRooms.css';
import toast, { Toaster } from 'react-hot-toast';

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

        if(roomNumber == ""){
            toast.error('Room number is required');
            return;
        }
        if(roomType == ""){
            toast.error('Room type is required');
            return;
        }
        if(roomCategory == ""){
            toast.error('Room category is required');
            return; 
        }
        if(roomBed == ""){
            toast.error('Room bed is required');
            return;
        }
        if(roomPrice == ""){
            toast.error('Room price is required');
            return;
        }
        if(roomDescription == ""){
            toast.error('Room description is required');
            return;
        }
        if(roomImage == ""){
            toast.error('Room image is required');
            return;
        }
        if (roomStatus == "") {
            toast.error('Room status is required');
            return;
        }
        // if(mainRoomImage == ""){
        //     toast.error('Main room image is required');
        //     return;
        // }
    
        const roomData = {
            roomNumber,
            roomType: roomType.toUpperCase(), // Convert roomType value to uppercase
            roomCategory: roomCategory.toUpperCase(), // Convert roomCategory value to uppercase
            roomBed: roomBed.toUpperCase(), // Convert roomBed value to uppercase
            roomPrice,
            roomDescription,
            roomImage,
            roomStatus,
            hasAC: hasAC == true ? "true" : "false",
            hasWifi: hasWifi == true ? "true" : "false",
            hasTV: hasTV == true ? "true" : "false",
            hasBalcony: hasBalcony == true ? "true" : "false",
            hasRefridge: hasRefridge == true ? "true" : "false",
        };
        const mainRoomImage = roomImage;

        try {
            const data = await postRoomData(roomData, mainRoomImage, roomImage1, roomImage2, roomImage3);
            console.log('Room added successfully:', data);

            if (data.statusCode == 200) {
                toast.success('Room added successfully');
            }
        } catch (error) {

            console.error('Error adding room:', error);
            toast.error('Room added failed');
        }
    }

    const convertToBoolean = (value) => {
        if (value === "true") {
            return true;
        } else {
            return false;
        }
        return false;
    };

    return (
        <div >
            <div className='header'>
                <h1>Add Hotel Rooms</h1>
            </div>

            <div className='body'>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 3000,
                    }}
                />
                <form className='form-input' onSubmit={handleSubmit}>
                    <div className='form-sections'>
                        <div className='form-section'>
                            <div className='form-individual-css'>
                                <div>
                                    <label htmlFor="roomNumber">
                                        Room Number:
                                    </label>
                                </div>
                                <div className='input-styling'>
                                    <input
                                        // className='border focus:outline-none' 
                                        className='input-field-div'
                                        type="text"

                                        name="roomNumber"
                                        placeholder='   eg : 101'

                                        value={roomNumber}
                                        onChange={(e) => setRoomNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="roomImage">
                                    Room Main Image:
                                </label>
                                <input
                                    className='input-field-div'
                                    type="file"
                                    name="roomImage"
                                    onChange={(e) => setRoomImage(e.target.files[0])} // Use e.target.files to get the selected file
                                />
                            </div>
                            <div className='form-individual-css'>

                                <label htmlFor="roomImage">
                                    Side Room Image 1 :
                                </label>
                                <input
                                    className='input-field-div'
                                    type="file"
                                    name="roomImage"
                                    onChange={(e) => setRoomImage1(e.target.files[0])} // Use e.target.files to get the selected file
                                />
                            </div>
                            <div className='form-individual-css'>

                                <label htmlFor="roomImage">
                                    Side Room Image 2:
                                </label>
                                <input
                                    className='input-field-div'
                                    type="file"
                                    name="roomImage"
                                    onChange={(e) => setRoomImage2(e.target.files[0])} // Use e.target.files to get the selected file

                                />
                            </div>
                            <div className='form-individual-css'>

                                <label htmlFor="roomImage">
                                    Side Room Image 3:
                                </label>
                                <input
                                    className='input-field-div'
                                    type="file"
                                    name="roomImage"
                                    onChange={(e) => setRoomImage3(e.target.files[0])} // Use e.target.files to get the selected file

                                />
                            </div>
                            <div className='see'>
                                <label htmlFor="roomDescription">
                                    Room Description:
                                </label>
                            </div>
                        </div>
                        <div className='image-section'>
                            <div className='form-individual-css'>
                                <label htmlFor="roomPrice">
                                    Room Price:
                                </label>
                                <div className='input-styling'>
                                    <input
                                        className='input-field-div'
                                        type="text"
                                        name="roomPrice"
                                        placeholder='   eg : 1000'
                                        value={roomPrice}
                                        onChange={(e) => setRoomPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="hasAc">
                                    Has AC:
                                </label>
                                <div className='input-styling'>
                                    <select
                                        className='input-field-div'

                                        name="hasAC"
                                        value={hasAC}
                                        onChange={(e) => setHasAC(convertToBoolean(e.target.value))}
                                    >
                                        <option value="">Select AC condition</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="hasWifi">
                                    Has Wifi:
                                </label>
                                <select
                                    className='input-field-div'

                                    name="hasWifi"
                                    value={hasWifi}
                                    onChange={(e) => setHasWifi(convertToBoolean(e.target.value))}
                                >
                                    <option value="">Select Wifi condition</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="hasTV">
                                    Has TV:
                                </label>
                                <select
                                    className='input-field-div'

                                    name="hasTV"
                                    value={hasTV}
                                    onChange={(e) => setHasTV(convertToBoolean(e.target.value))}
                                >
                                    <option value="">Select TV condition</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="hasBalcony">
                                    Has Balcony:
                                </label>
                                <select
                                    className='input-field-div'

                                    name="hasBalcony"
                                    value={hasBalcony}
                                    onChange={(e) => setHasBalcony(convertToBoolean(e.target.value))}
                                >
                                    <option value="">Select Balcony condition</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='multiple-selection'>
                            <div className='form-individual-css'>
                                <label htmlFor="roomType">
                                    Room Type:
                                </label>
                                <select
                                    className='input-field-div'
                                    name="roomType"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="roomCategory">
                                    Room Category:
                                </label>
                                <select
                                    className='input-field-div'
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
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="roomBed">
                                    Room Bed:
                                </label>
                                <select
                                    className='input-field-div'
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
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="roomStatus">
                                    Room Status:
                                </label>
                                <select
                                    className='input-field-div'
                                    name="roomStatus"
                                    value={roomStatus}
                                    onChange={(e) => setRoomStatus(e.target.value)}
                                >
                                    <option value="">Select Room Status</option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                            <div className='form-individual-css'>
                                <label htmlFor="hasRefridge">
                                    Has Refrigerator:
                                </label>
                                <select
                                    className='input-field-div'
                                    name="hasRefridge"
                                    value={hasRefridge}
                                    onChange={(e) => setHasRefridge(convertToBoolean(e.target.value))}
                                >
                                    <option value="">Select Refrigerator condition</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className='button'>
                                <button
                                    type="submit" id="btn"
                                >
                                    Add Room
                                </button>
                            </div>
                        </div>
                        <div className='description-css'>
                            <div className='room-description'>
                                {/* <label htmlFor="roomDescription">
                                    Room Description:
                                </label> */}
                                <div className=''>
                                    <textarea
                                        className='input-field-div'
                                        name="roomDescription"
                                        placeholder='     eg : This is a room with a mountain view'
                                        value={roomDescription}
                                        onChange={(e) => setRoomDescription(e.target.value)}
                                        // increase the height and width of the textarea
                                        style={{ height: "200px", width: "100%" }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default VendorAddRooms;
