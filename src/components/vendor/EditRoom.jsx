import React, { useState, useEffect } from 'react';
import "./EditRoom.css";
import { useParams } from 'react-router-dom';
import { getAllRoomData } from '../../services/vendor/GetAllRoomAPI';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { updateRoomData } from '../../services/vendor/UpdateRoom';

function EditRoom() {

    const { roomId } = useParams();


    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomCategory, setRoomCategory] = useState('');
    const [roomBed, setRoomBed] = useState('');

    const [roomPrice, setRoomPrice] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const [roomImage, setRoomImage] = useState('');

    const [roomImage1, setRoomImage1] = useState(null);
    const [roomImage2, setRoomImage2] = useState(null);
    const [roomImage3, setRoomImage3] = useState(null);

    const [roomStatus, setRoomStatus] = useState('');

    const [hasAC, setHasAC] = useState('');
    const [hasWifi, setHasWifi] = useState('');
    const [hasTV, setHasTV] = useState('');
    const [hasBalcony, setHasBalcony] = useState('');
    const [hasRefridge, setHasRefridge] = useState('');


    useEffect(() => {
        const fetchSpecificRoom = async () => {
            const pageNumber = 0;
            const pageSize = 7;
            try {
                const res = await getAllRoomData(pageNumber, pageSize);
                const filteredRoom = res.content.filter(room => room.roomId === parseInt(roomId));
                if (filteredRoom.length > 0) {
                    const roomData = filteredRoom[0];
                    setRoomNumber(roomData.roomNumber);
                    setRoomType(roomData.roomType);
                    setRoomCategory(roomData.roomCategory);
                    setRoomBed(roomData.roomBed);
                    setRoomPrice(roomData.roomPrice);
                    setRoomDescription(roomData.roomDescription);
                    setRoomImage(roomData.mainRoomImage);
                    setRoomStatus(roomData.roomStatus);
                    setHasAC(roomData.hasAC);
                    setHasWifi(roomData.hasWifi);
                    setHasTV(roomData.hasTV);
                    setHasBalcony(roomData.hasBalcony);
                    setHasRefridge(roomData.hasRefridge);

                    setRoomImage1(roomData.roomImages[0]);
                    setRoomImage2(roomData.roomImages[1]);
                    setRoomImage3(roomData.roomImages[2]);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchSpecificRoom();
    }, [roomId]);


    //update the room data

    async function handleSubmit(e) {
        e.preventDefault();

        if (roomNumber == "") {
            toast.error('Room number is required');
            return;
        }
        if (roomType == "") {
            toast.error('Room type is required');
            return;
        }
        if (roomCategory == "") {
            toast.error('Room category is required');
            return;
        }
        if (roomBed == "") {
            toast.error('Room bed is required');
            return;
        }
        if (roomPrice == "") {
            toast.error('Room price is required');
            return;
        }
        if (roomDescription == "") {
            toast.error('Room description is required');
            return;
        }
        if (roomImage == "") {
            toast.error('Room image is required');
            return;
        }
        if (roomStatus == "") {
            toast.error('Room status is required');
            return;
        }

        const roomData = {
            roomNumber,
            roomType: roomType.toUpperCase(), // Convert roomType value to uppercase
            roomCategory: roomCategory.toUpperCase(), // Convert roomCategory value to uppercase
            roomBed: roomBed.toUpperCase(), // Convert roomBed value to uppercase
            roomPrice,
            roomDescription,
            mainRoomImage: roomImage,
            roomStatus,
            hasAC: hasAC == true ? "true" : "false",
            hasWifi: hasWifi == true ? "true" : "false",
            hasTV: hasTV == true ? "true" : "false",
            hasBalcony: hasBalcony == true ? "true" : "false",
            hasRefridge: hasRefridge == true ? "true" : "false",
        };
        const mainRoomImage = roomImage;


        const res = await updateRoomData(roomId, roomData, mainRoomImage, roomImage1, roomImage2, roomImage3);
        if (res) {
            toast.success('Room updated successfully');
        } else {
            toast.error('Room update failed');
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
        <div className='parentdiv'>
            <div className='header'>
                <h1>Edit Rooms</h1>
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
                                    <option value="">{roomType}</option>
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
                                    onChange={(e) => setRoomCategory(e.target.value)}
                                >
                                    <option value="">{roomCategory}</option>
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
                                    <option value="">{roomBed}</option>
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
                                    <option value="">{roomStatus}</option>
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
                                    Update Room
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

export default EditRoom;
