import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs"; // Import dayjs library
import "dayjs/locale/en";
import { MdAir, MdSouth } from "react-icons/md";
import { MdOutlineBalcony } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TiWiFi } from "react-icons/ti";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { MdLocalOffer } from "react-icons/md";
import { MdLocalOfferOutlined } from "react-icons/md";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import getAllRoomData from "../../services/user/GetAllRoomData";
import "./Bookings.css";
import { postBookRoom } from "../../services/user/PostBookRoomAPI";

export default function Booking() {

  const currentDate = dayjs().format("DD-MM-YYYY");
  const userName = localStorage.getItem("userData").replace(/['"]+/g, '');

  const { hotelId, roomId, roomPrice } = useParams();
  const roomPriceInt = parseInt(roomPrice);

  console.log("hotelId:->", hotelId);
  console.log("roomId:->", roomId);
  console.log("roomPrice:->", roomPriceInt);

  const [roomData, setRoomData] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [preOrderPrice, setPreOrderRoomPrice] = useState(roomPriceInt);

  useEffect(() => {

    const getAllRooms = async () => {
      try {
        const data = await getAllRoomData(hotelId);
        console.log("room data:->", data);

        setRoomData(data.body);
      } catch (error) {
        console.error('Error fetching all room data data:', error);
      }
    };
    getAllRooms();
  }, []);

  const bookRoom = () => {
    // Validation of data

    console.log(currentDate);

    if (dayjs(startDate).format("DD-MM-YYYY") <= currentDate) {
      toast.error("Start date must be later than today");
      return;
    }

    if (dayjs(endDate).format("DD-MM-YYYY") < dayjs(startDate).format("DD-MM-YYYY")) {
      toast.error("End date must be later than start date");
      return;
    }

    const bookingData = {
      hotelId: hotelId,
      roomId: roomId,
      startDate: dayjs(startDate).format("DD-MM-YYYY"),
      endDate: dayjs(endDate).format("DD-MM-YYYY"),
      numberOfGuests: numberOfGuests,
      paymentMethod: paymentMethod,
      userName: userName
    };

    console.log(bookingData);

    // Add further processing or API calls here
    const res = postBookRoom(roomId, startDate, endDate, numberOfGuests, paymentMethod, userName);

    if(res.message != "Success"){
      toast.success("Room booked successfully");
      return;
    }
    toast.error("Room booking failed");
  };

    return (
      <div className="pt-40">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <div>
          {
            roomData.map((room) => {
              if (room.roomId == roomId) {
                return (
                  <div className="room-Amenties" key={roomId}>
                    <div className="hotel-name">
                      <h3>Room Amenties</h3>
                    </div>
                    <div className="amenties">
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
                );
              }
            })
          }
        </div>

        {/* for booking form */}
        <div className="booking-section">

          {/* for start date */}
          <div className="date-picker">
            <label className="label">
              Check-in Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                date={startDate}
                onChange={(newDate) => setStartDate(newDate)}
              />
            </LocalizationProvider>
          </div>

          {/* for end date */}
          <div className="date-picker">
            <label className="label">Check-out Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                date={endDate}
                onChange={(newDate) => setEndDate(newDate)}
              />
            </LocalizationProvider>
          </div>

          <div className="booking-third-section">

            <div className="third-first-field">
              <label className="label">Enter Number of People</label>
              <br />
              <input
                type="text"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>

            <div className="third-second-field">
              <label>
                Select Method of Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={() => setPaymentMethod("Cash")}
                />
                <span className="radio-label">Cash On Arrival</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="khalti"
                  checked={paymentMethod === "khalti"}
                  onChange={() => setPaymentMethod("khalti")}
                />
                <span className="radio-label">Khalti</span>
              </label>
            </div>

          </div>

          {/* for fourth section */}
          {/* for fourth section */}
          <div className="fourth-section-field">
            <p>Confirmation Details </p>
            {

              <div className="booked-details">
                <p style={{ marginBottom: '10px' }}>User Name: {userName}</p>
                <p style={{ marginBottom: '10px' }}>Check-in Date: {startDate ? dayjs(startDate).format("DD-MM-YYYY") : null}</p>
                <p style={{ marginBottom: '10px' }}>Check-out Date: {endDate ? dayjs(endDate).format("DD-MM-YYYY") : null}</p>
                <p style={{ marginBottom: '10px' }}>Number of Guests: {numberOfGuests}</p>
                <p style={{ marginBottom: '10px' }}>Room Price Per Night: {preOrderPrice}</p>
                <p style={{ marginBottom: '10px' }}>Payment Method: {paymentMethod}</p>
                <button className="btn btn-primary"
                  onClick={bookRoom}
                >
                  Book Now
                </button>
              </div>

            }
          </div>


        </div>

      </div >
    );
  }