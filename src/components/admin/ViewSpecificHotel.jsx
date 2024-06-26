import React, { useEffect, useState } from 'react'
import './ViewSpecificHotel.css'
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWifi,
    faFan,
    faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { getAllHotelData } from '../../services/user/GetAllHotelAPI';
import getAllRoomData from "../../services/user/GetAllRoomData";
import BaseUrl from "../../services/BaseUrl";
import { FaBed } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TiSortNumerically } from "react-icons/ti";
import { FaHotel } from "react-icons/fa6";
import { MdAir } from "react-icons/md";
import { MdOutlineBalcony } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TiWiFi } from "react-icons/ti";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import Slider from 'rc-slider';
import { postRoomFilter } from "../../services/user/PostRoomFilterAPI";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineCottage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import getHotelRoomBookingStatus from '../../services/user/GetHotelRoomBookingStatus';

function ViewSpecificHotel() {

    const { hotelId } = useParams();
    console.log("user id", hotelId)

    const [hotelData, setHotelData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [bookingStatus, setBookingStatus] = useState([]);

    const fetchHotelData = async () => {
        try {
            const data = await getAllHotelData();
            setHotelData(data.body);
        } catch (error) {
            console.error('Error fetching all room data data:', error);
        }
    };

    const getAllRooms = async () => {
        try {
            const data = await getAllRoomData(hotelId);
            setRoomData(data.body);
        } catch (error) {
            console.error('Error fetching all room data data:', error);
        }
    };


    const getRoomBookingStatus = async () => {
        try {
            const data = await getHotelRoomBookingStatus(hotelId);
            console.log("Room Booking Status Data:", data);
            setBookingStatus(data);
        } catch (error) {
            console.error('Error fetching room booking status:', error);
        }
    }

    useEffect(() => {

        fetchHotelData();
        getAllRooms();
        getRoomBookingStatus();

    }, []);
    

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
            {hotelData?.map((hotel) => {
                if (hotel.hotelId == hotelId) {
                    return (
                        <div key={hotel.hotelPan}>
                            <div className="hotel-name-div">
                                {hotel.hotelName}
                            </div>
                            <div className="">
                                <div>{/* for hotel image */}</div>
                                {/* for hotel description */}
                                <div className="highlight">

                                    {/* hotel description */}
                                    <div className="hotel-first-div">

                                        <div className="hotel-first-details">
                                            {/* hotel contact */}
                                            <div className="first-holder">

                                                <FaPhoneAlt className="hotel-icons" />
                                                <label>Contact</label>
                                                {
                                                    hotel.hotelContact
                                                }

                                            </div>

                                            {/* hotel address */}
                                            <div className="first-holder">
                                                <IoLocation className="hotel-icons" />
                                                <label >Address</label>
                                                {
                                                    hotel.hotelAddress
                                                }
                                            </div>

                                            {/* hotel email */}
                                            <div className="first-holder">
                                                <MdEmail className="hotel-icons" />
                                                <label >Email</label>
                                                {
                                                    hotel.hotelEmail
                                                }
                                            </div>

                                        </div>

                                        <div className="hotel-description">
                                            {
                                                hotel.hotelDescription
                                            }
                                        </div>
                                    </div>


                                    {/* amenities section */}
                                    <div className="hotel-Amenties">
                                        <div className="hotel-name">
                                            <h3>Hotel Amenities</h3>
                                        </div>

                                        <div className="amenities">
                                            {hotel.hasWifi && (
                                                <div className="amenties-item">
                                                    <TiWiFi className="icons-div" />
                                                    <p>Free Wifi</p>
                                                </div>
                                            )}
                                            {hotel.hasAC && (
                                                <div className="amenties-item">
                                                    <MdAir className="icons-div" /><p>AC</p>
                                                </div>
                                            )}
                                            {hotel.hasBalcony && (
                                                <div className="amenties-item">
                                                    <MdOutlineBalcony className="icons-div" />

                                                    <p>Balcony</p>
                                                </div>
                                            )}
                                            {
                                                hotel.hasTV && (
                                                    <div className="amenties-item">
                                                        <PiTelevisionSimpleFill className="icons-div" />
                                                        <p>TV</p>
                                                    </div>
                                                )
                                            }
                                            {
                                                hotel.hasRefridge && (
                                                    <div className="amenties-item">
                                                        <FontAwesomeIcon icon={faPersonThroughWindow} />
                                                        <p>Refrigerator</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                }
                return null; // This is important to avoid error
            })}
            </div>

            <div className="parent-room-div">
                    {roomData?.map((room) => (
                        <div key={room.roomId}>
                            <div className="hotel-rooms">
                                <RoomCarousel room={room} />

                                {/* wrapping three divsfor booking form */}
                                {/* <div className="main-three-div"> */}
                                <div className="room-first">
                                    <div className="amenties-component">
                                        <div className="title">
                                            <TiSortNumerically className="icons-div" />
                                            <div className="room-title">
                                                Room Number
                                            </div>
                                        </div>

                                        <div>{room.roomNumber}</div>
                                    </div>
                                    <div className="amenties-component">
                                        <div className="title">
                                            <FaBed className="icons-div" />
                                            <div className="room-title">
                                                Room Type
                                            </div>
                                        </div>

                                        <div>{room.roomType}</div>
                                    </div>
                                    <div className="amenties-component">
                                        <div className="title">
                                            <FaHotel className="icons-div" />
                                            <div className="room-title">
                                                Room Category
                                            </div>
                                        </div>

                                        <div>{room.roomCategory}</div>
                                    </div>
                                    <div className="amenties-component">
                                        <div className="title">
                                            <FaMoneyCheckAlt className="icons-div" />
                                            <div className="room-title">
                                                Room Price
                                            </div>
                                        </div>

                                        <div>{room.roomPrice}</div>
                                    </div>
                                    <div className="amenties-component">
                                        <div className="title">
                                            <FaBed className="icons-div" />
                                            <div className="room-title">
                                                Room Bed
                                            </div>
                                        </div>

                                        <div>{room.roomBed}</div>
                                    </div>

                                </div>
                                <div className="room-second">
                                    <div>
                                        <h4
                                            className="feature-div"
                                        >Room Features</h4>
                                        <div className="room-amenities-div">
                                            <div className="amenity-item">
                                                <MdAir className="icons-div" />

                                                <p className="room-title" >AC</p>
                                                <span>{room.hasAC ? 'Available' : 'Not Available'}</span>
                                            </div>
                                            <div className="amenity-item">
                                                <MdOutlineBalcony className="icons-div" />
                                                <p className="room-title" >Balcony</p>
                                                <span>{room.hasBalcony ? 'Available' : 'Not Available'}</span>
                                            </div>
                                            <div className="amenity-item">
                                                <PiTelevisionSimpleFill className="icons-div" />
                                                <p className="room-title" >TV</p>
                                                <span>{room.hasTV ? 'Available' : 'Not Available'}</span>
                                            </div>
                                            <div className="amenity-item">
                                                <TiWiFi className="icons-div" />
                                                <p className="room-title" >Wi-Fi</p>
                                                <span>{room.hasWifi ? 'Available' : 'Not Available'}</span>
                                            </div>
                                            <div className="amenity-item">
                                                <CgSmartHomeRefrigerator className="icons-div" />
                                                <p className="room-title" >Refrigerator</p>
                                                <span>{room.hasRefridge ? 'Available' : 'Not Available'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="room-third">
                                    <div>
                                        {bookingStatus.map(status => {
                                            if (status.roomId === room.roomId && status.bookingStatus === "BOOKED") {
                                                return (
                                                    <div key={status.bookingId} className="alert-booking-div">
                                                        <div className="alert-head-booking">
                                                            Room is Booked
                                                        </div>
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
                                    </div>
                                    <div className="room-description-div">
                                        <h4 className="feature-div">Room Description</h4>
                                        <p>{room.roomDescription}</p>
                                    </div>
                                </div>



                            </div>
                        </div>
                    ))
                    }
                </div>

        </div>
    )
}

export default ViewSpecificHotel
