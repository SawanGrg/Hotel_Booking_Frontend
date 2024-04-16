import React, { useState, useEffect } from 'react'
import './ViewVendorRoom.css'

import { useParams } from "react-router-dom";
import BaseUrl from "../../services/BaseUrl";
import { FaBed } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TiSortNumerically } from "react-icons/ti";
import { FaHotel } from "react-icons/fa6";
import { MdAir } from "react-icons/md";
import { MdOutlineBalcony } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TiWiFi } from "react-icons/ti";
import { CgSmartHomeRefrigerator } from "react-icons/cg";


import GetHotelReview from "../../services/user/GetHotelReview";
import { postHotelReview } from "../../services/user/PostHotelReview";
import getHotelRoomBookingStatus from "../../services/user/GetHotelRoomBookingStatus";
import getSpecificRoom from '../../services/vendor/GetSpecificRoom';
import getRoomBookingStatus from '../../services/vendor/GetRoomBookingStatus';
import getRoomHistory from '../../services/vendor/GetRoomHistory';


export default function ViewVendorRoom() {

    const { roomId } = useParams();

    console.log("Room Id:", roomId);

    const [roomData, setRoomData] = useState([]);
    const [bookingStatus, setBookingStatus] = useState([]);
    const [roomHistory, setRoomHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomResponse = await getSpecificRoom(roomId);
                const statusResponse = await getRoomBookingStatus(roomId);
                const historyResponse = await getRoomHistory(roomId);
                setRoomData(roomResponse);
                setBookingStatus(statusResponse);
                setRoomHistory(historyResponse);
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                console.log("Room Data:", roomData);
            }
        };

        fetchData();
    }, [roomId]);

    const RoomCarousel = ({ room }) => {

        const [currentIndex, setCurrentIndex] = useState(0);

        const handlePrevClick = () => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? room.roomImages.length : prevIndex - 1
            );
        };

        const handleNextClick = () => {
            setCurrentIndex((prevIndex) =>
                prevIndex === room.roomImages.length ? 0 : prevIndex + 1
            );
        };

        // Combine main room image and additional room images
        const allImages = [
            { imageId: 0, imageUrl: room.mainRoomImage },
            ...room.roomImages,
        ];

        // Ensure currentIndex is within the valid range
        const validIndex = Math.max(0, Math.min(currentIndex, allImages.length - 1));

        const currentImage = allImages[validIndex];

        // Check if currentImage is defined before accessing its properties
        if (!currentImage || !currentImage.imageUrl) {
            return <div>Error: Image data is missing or invalid.</div>;
        }

        return (
            <div className="room-slider">
                <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                className="d-block w-100"
                                src={`${BaseUrl}/images/${currentImage.imageUrl}`}
                                alt={`Room ${validIndex + 1}`}
                                style={imageCss}
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        role="button"
                        data-slide="prev"
                        onClick={handlePrevClick}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        role="button"
                        data-slide="next"
                        onClick={handleNextClick}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
            </div>
        );
    };

    const imageCss = {
        display: "block",
        height: 600,
        width: 800,
        objectFit: "cover",
        borderRadius: 10,
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
    };


    return (
        <div>
            <div>
                {roomData?.map((room) => (
                    <div key={room.roomId}>

                        <div className="hotel-rooms">
                            <RoomCarousel room={room} />

                            <div className="room-first">
                                <div className="amenties-component">
                                    <div className="title">
                                        <TiSortNumerically className="icons-div" />
                                        <div className="room-title">Room Number</div>
                                    </div>
                                    <div>{room.roomNumber}</div>
                                </div>
                                <div className="amenties-component">
                                    <div className="title">
                                        <FaBed className="icons-div" />
                                        <div className="room-title">Room Type</div>
                                    </div>
                                    <div>{room.roomType}</div>
                                </div>
                                <div className="amenties-component">
                                    <div className="title">
                                        <FaHotel className="icons-div" />
                                        <div className="room-title">Room Category</div>
                                    </div>
                                    <div>{room.roomCategory}</div>
                                </div>
                                <div className="amenties-component">
                                    <div className="title">
                                        <FaMoneyCheckAlt className="icons-div" />
                                        <div className="room-title">Room Price</div>
                                    </div>
                                    <div>{room.roomPrice}</div>
                                </div>
                                <div className="amenties-component">
                                    <div className="title">
                                        <FaBed className="icons-div" />
                                        <div className="room-title">Room Bed</div>
                                    </div>
                                    <div>{room.roomBed}</div>
                                </div>
                            </div>

                            <div className="room-second">
                                <h4 className="feature-div">Room Features</h4>
                                <div className="room-amenities-div">
                                    <div className="amenity-item">
                                        <MdAir className="icons-div" />
                                        <p className="room-title">AC</p>
                                        <span>{room.hasAC ? 'Available' : 'Not Available'}</span>
                                    </div>
                                    <div className="amenity-item">
                                        <MdOutlineBalcony className="icons-div" />
                                        <p className="room-title">Balcony</p>
                                        <span>{room.hasBalcony ? 'Available' : 'Not Available'}</span>
                                    </div>
                                    <div className="amenity-item">
                                        <PiTelevisionSimpleFill className="icons-div" />
                                        <p className="room-title">TV</p>
                                        <span>{room.hasTV ? 'Available' : 'Not Available'}</span>
                                    </div>
                                    <div className="amenity-item">
                                        <TiWiFi className="icons-div" />
                                        <p className="room-title">Wi-Fi</p>
                                        <span>{room.hasWifi ? 'Available' : 'Not Available'}</span>
                                    </div>
                                    <div className="amenity-item">
                                        <CgSmartHomeRefrigerator className="icons-div" />
                                        <p className="room-title">Refrigerator</p>
                                        <span>{room.hasRefridge ? 'Available' : 'Not Available'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="room-third">
                                {bookingStatus.map(status => {
                                    if (status.roomId === room.roomId && status.bookingStatus === "BOOKED") {
                                        return (
                                            <div key={status.bookingId} className="alert-booking-div">
                                                <div className="alert-head-booking">Room is Booked</div>
                                                <div className="night">
                                                    <strong>Check in :</strong> {status.checkInDate}
                                                </div>
                                                <div className="night">
                                                    <strong>Check out:</strong> {status.checkOutDate}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                                <div className="room-description-div">
                                    <h4 className="feature-div">Room Description</h4>
                                    <p>{room.roomDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='room-history'>

                <div className='room-book-history'>
                    <h1>
                        Room Book History
                    </h1>
                </div>
                <div className='real-room-history'>
                    <table>
                        <thead>
                            <tr>
                                <th>Booked By</th>
                                <th>Check In Date</th>
                                <th>Check Out Date</th>
                                <th>Amount Price</th>
                                <th>Payment Status</th>
                                <th>Booked Date</th>
                                <th>Book Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomHistory.map((room, i) => (
                                <tr key={i}>
                                    <td data-cell="Booked By">{room.userName}</td>
                                    <td data-cell="Check In Date">{room.checkInDate}</td>
                                    <td data-cell="Check Out Date">{room.checkOutDate}</td>
                                    <td data-cell="Amount Price">{room.totalAmount}</td>
                                    <td data-cell="Payment Status">{room.paymentMethod}</td>
                                    <td data-cell="Booked Date">{new Date(room.bookingDate).toLocaleDateString()}</td>
                                    <td data-cell="Book Status">{room.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
}    