import React, { useState, useEffect } from 'react';
import { getAllRoomData } from '../../services/vendor/GetAllRoomAPI';
import "./VendorViewAllRooms.css";
import { DeleteRoomAPI } from '../../services/vendor/DeleteRoomAPI';
export default function VendorViewAllRooms() {
    const [roomList, setRoomList] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchAllRooms();
    }, []);

    const deleteSpecificRoom = async (roomId) => {
        try {
            console.log("Room Id for deletion:", roomId);
            const res = await DeleteRoomAPI(roomId);
            setSuccessMessage(res.data);
            // fetchAllRooms();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const fetchAllRooms = async () => {
        const pageNumber = 0;
        const pageSize = 3;

        try {
            const roomData = await getAllRoomData(pageNumber, pageSize);
            const rooms = roomData.content;
            setRoomList(rooms);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h1>Vendor All Rooms</h1>
            <div>
                <table>
                    <tr>
                        <th>Room Id</th>
                        <th>Room Description</th>
                        <th>Room Type</th>
                        <th>Room Price</th>
                        <th>Room Bed</th>
                        <th>Room Status</th>
                        <th>Activities</th>
                    </tr>
                    {
                        roomList.map((room) => (
                            <tr>
                                <td data-cell="Room Id">{room.roomId}</td>
                                <td data-cell="Room Description">{room.roomDescription}</td>
                                <td data-cell="Room Type">{room.roomType}</td>
                                <td data-cell="Room Price">{room.roomPrice}</td>
                                <td data-cell="Room Bed">{room.roomBed}</td>
                                <td data-cell="Room Status">{room.roomStatus}</td>
                                <td data-cell="Activities">
                                    <button>
                                        Edit
                                    </button>
                                    <button 
                                    onClick={() => deleteSpecificRoom(room.roomId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </table>
            </div>
        </div>
    );
}
