import React, { useEffect, useState } from "react";
import "./SpecificHotel.css";
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



import GetHotelReview from "../../services/user/GetHotelReview";
import { postHotelReview } from "../../services/user/PostHotelReview";
import getHotelRoomBookingStatus from "../../services/user/GetHotelRoomBookingStatus";
import GetHotelOwnerUserName from "../../services/user/GetHotelOwnerUserName";


export default function SpecificHotel() {

    const [hotelData, setHotelData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [hotelOwnerUserName, setHotelOwnerUserName] = useState('');
    const { hotelId } = useParams();
    const navigate = useNavigate();

    async function handleRoomBooking(roomId, roomPrice) {

        const token = localStorage.getItem("token");
        const userPayload = localStorage.getItem("userData");
        const role = localStorage.getItem("role");

        
        //if role is null then redirect to login page
        // Check if token exists to determine if the user is logged in
        if (token == null || token == undefined) {
            toast.error("Please login to book room");
            // Redirect to login page or handle authentication
            return;
        }
        const removedQuotes = role.replace(/['"]+/g, '');
        const userName = userPayload.replace(/['"]+/g, '');
        
        if (removedQuotes == "ROLE_ADMIN") {
            toast.error("System Admin Cannot Book Room");
            return;
        }
        
        if (userName == hotelOwnerUserName) {
            toast.error("You are the owner of this hotel, you can't book room");
            return;
        }
        
        
        if (removedQuotes == "ROLE_USER" || removedQuotes == "ROLE_VENDOR") {
            console.log("userPayload:->", userPayload);
            console.log("role:->", role);
            console.log("token:->", token);
            console.log("roomId:->", roomId);
            console.log("roomPrice:->", roomPrice);
            navigate(`/hotel/${hotelId}/room/${roomId}/${roomPrice}`);
        }

    }

    const [bookingStatus, setBookingStatus] = useState([]);

    const getRoomBookingStatus = async () => {
        try {
            const data = await getHotelRoomBookingStatus(hotelId);
            console.log("Room Booking Status Data:", data);
            setBookingStatus(data);
        } catch (error) {
            console.error('Error fetching room booking status:', error);
        }
    }

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

    const getHotelOwnerUserName = async (hotelId) => {
        try {
            const data = await GetHotelOwnerUserName(hotelId);
            setHotelOwnerUserName(data.body);
        } catch (error) {
            console.error('Error fetching hotel owner user name:', error);
        }
    }

    useEffect(() => {

        fetchHotelData();
        getAllRooms();
        getRoomBookingStatus();
        getHotelOwnerUserName(hotelId);

    }, []);

    // hotel review section
    const [hotelReview, setHotelReview] = useState([]);
    const [userReview, setUserReview] = useState('');

    const getAllReviews = async () => {
        try {
            const data = await GetHotelReview(hotelId);
            console.log("Hotel Review Data:", data);
            setHotelReview(data);
        } catch (error) {
            console.error('Error fetching hotel reviews:', error);
        }
    };
    useEffect(() => {

        getAllReviews();
    }, [hotelId]);

    // Update the handleReview method to send the review data as an object
    const handleReview = async () => {

        const jwt = localStorage.getItem('token');

        if (!userReview.trim()) {
            toast.error('Please enter a review before submitting.');
            return;
        }

        if (!jwt) {
            toast.error('Please login to submit a review.');
            return;
        }

        try {
            const response = await postHotelReview(hotelId, {
                hotelReview: userReview,
            });

            if (response.statusCode === 200) {
                console.log('Review submitted successfully.');
                setUserReview('');
                getAllReviews();
            } else {
                console.error('Failed to submit review:', response.message);
            }
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };



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


    const [sliderValue, setSliderValue] = useState(5000);
    const [selectedBedType, setSelectedBedType] = useState('');
    const [selectedRoomCategory, setSelectedRoomCategory] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');

    const [hasAC, setHasAC] = useState('');
    const [hasBalcony, setHasBalcony] = useState('');
    const [hasRefridge, setHasRefridge] = useState('');

    const handleSliderChange = (event) => {
        setSliderValue(parseInt(event.target.value, 10));
    };

    const handleBedTypeChange = (event) => {
        const bedType = event.target.value;

        if (selectedBedType === bedType) {
            setSelectedBedType('');
        } else {
            // Select the newly clicked bed type
            setSelectedBedType(bedType);
        }
    };

    const handleRoomCategoryChange = (event) => {
        const roomCategory = event.target.value;

        // Unselect the previously selected room category
        if (selectedRoomCategory === roomCategory) {
            setSelectedRoomCategory('');
        } else {
            // Select the newly clicked room category
            setSelectedRoomCategory(roomCategory);
        }
    };

    const handleRoomTypeChange = (event) => {
        const roomType = event.target.value;

        // Unselect the previously selected room type
        if (selectedRoomType === roomType) {
            setSelectedRoomType('');
        } else {
            // Select the newly clicked room type
            setSelectedRoomType(roomType);
        }
    }

    const filterRoom = async () => {
        try {
            const data = await postRoomFilter(hotelId, sliderValue, selectedRoomType, selectedRoomCategory, selectedBedType, hasAC, hasBalcony, hasRefridge);
            console.log("room data from filtered room:->", data);

            setRoomData(data.body);

        } catch (error) {
            console.error('Error fetching filter room data data:', error);
        }
    }
    useEffect(() => {

        console.log("sliderValue:->", sliderValue);
        console.log("selectedBedType:->", selectedBedType);
        console.log("selectedRoomCategory:->", selectedRoomCategory);
        console.log("selectedRoomType:->", selectedRoomType);

        filterRoom();

    }, [sliderValue, selectedBedType, selectedRoomCategory, selectedRoomType]);

    const imageCss = {
        display: "block",
        height: 600,
        width: 800,
        objectFit: "cover",
        borderRadius: 10,
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
    };

    return (
        <div className="pt-40">
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                }}
            />
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

            <div className="parent-filter-room">

                <div className="parent-filter-section">
                    <div className="filter-text">
                        <div>
                            <FaFilter className="room-filter-icons" />
                        </div>
                        <div className="filter-room-title" >
                            Filter Hotel Rooms
                        </div>
                    </div>

                    {/* for price slider */}
                    <div className="price-range">

                        <div className="price-title">
                            <div>
                                <FaMoneyBillTransfer className="room-filter-icons" />
                            </div>
                            <div className="filter-title-text">
                                Select Price Range (in Rs.)

                            </div>
                        </div>

                        <div className="price-input">

                            <label htmlFor="price-slider">
                                <span>{sliderValue}</span>
                            </label>

                            <input
                                type="range"
                                min={0}
                                max={10000}
                                value={sliderValue}
                                onChange={handleSliderChange}
                            />
                        </div>
                    </div>

                    {/* for room category */}
                    <div className="redendanent-bed-filter">

                        <div className="bed-type-title">
                            <div>
                                <FaHotel className="room-filter-icons" />
                            </div>
                            <div>
                                Room Category
                            </div>
                        </div>

                        <div className="room-category">
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="COUPLE"
                                    checked={selectedRoomCategory === 'COUPLE'}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>Couple</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="FAMILY"
                                    checked={selectedRoomCategory === 'FAMILY'}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>Family</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="BUSINESS"
                                    checked={selectedRoomCategory === 'BUSINESS'}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>Business</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="SINGLE"
                                    checked={selectedRoomCategory === 'SINGLE'}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>Single</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="DOUBLE"
                                    checked={selectedRoomCategory === 'DOUBLE'}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>Double</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value=""
                                    checked={!selectedRoomCategory}
                                    onChange={handleRoomCategoryChange}
                                />
                                <div>
                                    <label>None</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* for room type */}
                    <div className="redendanent-bed-filter">

                        <div className="bed-type-title">
                            <div>
                                <MdOutlineCottage className="room-filter-icons" />
                            </div>
                            <div>
                                Room Type

                            </div>
                        </div>

                        <div className="room-category">
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="DELUXE"
                                    checked={selectedRoomType === 'DELUXE'}
                                    onChange={handleRoomTypeChange}
                                />
                                <div>
                                    <label>Deluxe</label>
                                </div>
                            </div>

                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="SUITE"
                                    checked={selectedRoomType === 'SUITE'}
                                    onChange={handleRoomTypeChange}
                                />
                                <div>
                                    <label>Suite</label>
                                </div>
                            </div>


                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="STANDARD"
                                    checked={selectedRoomType === 'STANDARD'}
                                    onChange={handleRoomTypeChange}
                                />
                                <div>
                                    <label>Standard</label>
                                </div>
                            </div>


                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="ECONOMY"
                                    checked={selectedRoomType === 'ECONOMY'}
                                    onChange={handleRoomTypeChange}
                                />
                                <div className="bed-type">
                                    <label>Economy</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value=""
                                    checked={!selectedRoomType}
                                    onChange={handleRoomTypeChange}
                                />
                                <div className="bed-type">
                                    <label>None</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* for bed type */}
                    <div className="redendanent-bed-filter">
                        <div className="bed-type-title">
                            <div>
                                <FaBed className="room-filter-icons" />
                            </div>
                            <div>
                                Bed Type

                            </div>
                        </div>
                        <div className="bed-type">
                            <div className="bed-type-item">
                                <div>
                                    <input
                                        type="radio"
                                        value="SINGLE"
                                        checked={selectedBedType === 'SINGLE'}
                                        onChange={handleBedTypeChange}
                                    />
                                </div>
                                <div className="bed-type">
                                    <label>Single</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="DOUBLE"
                                    checked={selectedBedType === 'DOUBLE'}
                                    onChange={handleBedTypeChange}
                                />
                                <div className="bed-type">
                                    <label>Double</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="KING"
                                    checked={selectedBedType === 'KING'}
                                    onChange={handleBedTypeChange}
                                />
                                <div>
                                    <label>King</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value="QUEEN"
                                    checked={selectedBedType === 'QUEEN'}
                                    onChange={handleBedTypeChange}
                                />
                                <div>
                                    <label>Queen</label>
                                </div>
                            </div>
                            <div className="bed-type-item">
                                <input
                                    type="radio"
                                    value=""
                                    checked={!selectedBedType}
                                    onChange={handleBedTypeChange}
                                />
                                <div>
                                    <label>None</label>
                                </div>
                            </div>
                        </div>
                    </div>




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
                                    {bookingStatus.some(status => status.roomId === room.roomId && status.bookingStatus === "BOOKED") ? (
                                        <button className="book-button" disabled>
                                            Room is booked
                                        </button>
                                    ) : (
                                        <button className="book-button" onClick={() => handleRoomBooking(room.roomId, room.roomPrice)}>
                                            Book Now
                                        </button>
                                    )}
                                </div>



                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

            {/* for comment section div */}
            <div className="topper">
                <div className="parent-review-section">
                    <div className="dynamic-review">
                        <div className="review-heading">
                            <h2>Hotel Reviews</h2>

                        </div>
                        {
                            hotelReview.length === 0 ? (
                                <div >
                                    <div className="hotel-no-review">
                                        No reviews available
                                    </div>
                                    <div className="hotel-review">
                                        Be the first person to give review
                                    </div>
                                </div>
                            ) : (
                                hotelReview.map((review, index) => (
                                    <div key={index} className="review">
                                        <div className="comment-by">
                                            <div className="hotel-each-review">
                                                <FaUser className='user-icons' />
                                                <p className="reviewed-by">Review by: {review.userName}</p>
                                            </div>
                                            <div className="hotel-each-review">
                                                <MdDateRange className='user-icons' />
                                                <p className="reviewed-by">Reviewed Date: {new Date(review.createdDate).toDateString()}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="real-review">{review.hotelReview}</p>
                                        </div>
                                    </div>
                                ))
                            )
                        }

                    </div>
                    <div className="post-review">
                        <strong>Write Your Review</strong>
                        <textarea
                            placeholder="Write your review here"
                            style={{ width: "100%", height: "300px" }}
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                        />
                        <button
                            className="post-comment"
                            onClick={handleReview}
                        >Submit Review</button>
                    </div>
                </div>
            </div>

            {/* chatting section */}
            {/* <div>
                <Chatting hotelId={hotelId} />
            </div> */}
        </div >
    );
}