import React, { useState, useEffect } from 'react';
import { getAllRoomData } from '../../services/vendor/GetAllRoomAPI';
import "./VendorViewAllRooms.css";
import { DeleteRoomAPI } from '../../services/vendor/DeleteRoomAPI';
import toast, { Toast } from 'react-hot-toast';
import { set } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export default function VendorViewAllRooms() {

    const [roomList, setRoomList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchAllRooms();
    }, []);

    const deleteSpecificRoom = async (roomId) => {
        // try {
        console.log("Room Id for deletion:", roomId);
        const res = await DeleteRoomAPI(roomId);
        if (res.status == 200) {
            console.log("done from res 200 before")
            toast.success('Room Deleted successfully');
        }
        if (res) {
            console.log("done from res after");
            toast.success("Room Deleted Successfully");
            console.log("done")
            await fetchAllRooms();
        }
        // } catch (error) {
        //     console.error("Error:", error.message);
        // }
    }

    const fetchAllRooms = async () => {
        const pageNumber = 0;
        const pageSize = 7;

        try {
            const roomData = await getAllRoomData(pageNumber, pageSize);
            const rooms = roomData.content;
            setRoomList(rooms);
            setFilteredData(rooms);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const filteredDataByAvailability = (status) => {
        const filtered = roomList.filter(room => room.roomStatus == status);
        setFilteredData(filtered);
    }

    return (
        <div>
            <div className='body'>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 3000,
                    }}
                />
            </div>
            <div className='room-header'>
                <h1>View All Rooms</h1>
            </div>

            {/* filter section */}
            <div className="vendor-booking-filter">
                <div className='vendor-first-filter'>

                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => fetchAllRooms()}>
                            View All Rooms
                        </div>
                    </div>
                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => filteredDataByAvailability("AVAILABLE")} >
                            View Available Rooms
                        </div>
                    </div>
                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => filteredDataByAvailability("BOOKED")}>
                            View Booked Rooms
                        </div>
                    </div>
                </div>

                {/* second filter */}
                <div >
                    <div className='vendor-second-filter'>
                        <input type="text" placeholder="Search Room Name"

                            onChange={(e) => {
                                const searchValue = e.target.value;
                                const filtered = roomList.filter(room => room.roomNumber.toLowerCase().includes(searchValue.toLowerCase()));
                                setFilteredData(filtered);
                            }}

                        />
                    </div>
                </div>

            </div>

            <div>
                {filteredData.length === 0 ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Room Name</th>
                                    <th>Room Bed</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Room Category</th>
                                    <th>Added Date</th>
                                    <th>Room Status</th>
                                    <th>Activities</th>
                                </tr>
                            </thead>
                        </table>
                        <div className='no-data'>
                            <img src='/assets/vendor-404.avif' alt='No data found' />
                        </div>
                    </div>
                ) : (
                    <table>
                        <tr>
                            <th>Room Name</th>
                            <th>Room Bed</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Room Category</th>
                            <th>Added Date</th>
                            <th>Room Status</th>
                            <th>Activities</th>
                        </tr>
                        {
                            filteredData.map((room, i) => (
                                <tr key={i}>
                                    <td data-cell="Room Id">{room.roomNumber}</td>
                                    <td data-cell="Room Description">{room.roomBed}</td>
                                    <td data-cell="Room Type">{room.roomType}</td>
                                    <td data-cell="Room Price">{room.roomPrice}</td>
                                    <td data-cell="Room Bed">{room.roomBed}</td>
                                    <td data-cell="Room Status">{new Date(room.createdAt).toLocaleDateString()}</td>
                                    <td data-cell="Room Status">{room.roomStatus}</td>
                                    <td data-cell="Activities">
                                    <button>
                                            <Link to={`/room/${room.roomId}`}>
                                                <div className='making'>
                                                    <div>
                                                        <FaEye  className='icons' />
                                                    </div>
                                                    <div>
                                                        View
                                                    </div>
                                                </div>
                                            </Link>
                                        </button>
                                        <button>
                                            <Link to={`/vendor/editRoom/${room.roomId}`}>
                                                <div className='making'>
                                                    <div>
                                                        <FiEdit className='icons' />
                                                    </div>
                                                    <div>
                                                        Edit
                                                    </div>
                                                </div>
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => deleteSpecificRoom(room.roomId)}
                                        >
                                            <div className='making'>
                                                <div>
                                                    <MdDelete className='icons' />
                                                </div>
                                                <div>
                                                    Delete
                                                </div>
                                            </div>

                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </table>
                )}
            </div>
        </div>
    );
}
