import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import KhaltiCheckout from "khalti-checkout-web";
import getRoomAvailability from "../../services/user/GetRoomAvailability";
import { FaUser } from "react-icons/fa";
import postRoomKhalti from "../../services/user/PostRoomKhalti";
import postKhaltiAPI from "../../services/user/PostKhaltiAPI";

export default function Booking() {

  const currentDate = dayjs().format("DD-MM-YYYY"); // Get current date
  const userName = localStorage.getItem("userData").replace(/['"]+/g, '');

  const { hotelId, roomId, roomPrice } = useParams();
  const navigate = useNavigate();
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

  const [res, setRes] = useState({});

  const getAllRooms = async () => {
    try {
      const data = await getAllRoomData(hotelId);
      console.log("room data:->", data);

      setRoomData(data.body);
    } catch (error) {
      console.error('Error fetching all room data data:', error);
    }
  };

  const [roomAvailability, setRoomAvailability] = useState({});

  const getRoomStatus = async (roomId) => {
    try {
      const res = await getRoomAvailability(roomId);
      console.log("Room availability data:", res);
      setRoomAvailability(res);
      setStartDate("");
      setEndDate("");
      setPaymentMethod("");
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  };

  const khaltiPost = async (pidx, status, bookingId, amount) => {

    try{
      const response = await postKhaltiAPI(pidx, status, bookingId, amount);
      console.log("Response from khalti post:", response);
      toast.success("Payment successful");
      

    }catch(error){
      console.error("Error while khalti integration:", error);
      toast.error("Payment failed");
    }
  }

  useEffect(() => {

    console.log("useEffect called");

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(params); // This will log an object containing all the query parameters

    if(params.pidx && params.transaction_id && params.amount && params.status){
    // Access individual parameters
    const pidx = params.pidx;
    const amount = params.amount;
    const status = params.status;
    const bookingId = params.purchase_order_id;

    console.log(pidx, bookingId, amount, status); // Log individual parameters
    khaltiPost(pidx, status, bookingId, amount);
    return;
  }

  console.log("useEffect called");
    getAllRooms();
    getRoomStatus(roomId);
    console.log("Room availability status:", roomAvailability.status);
  }, []);

  const bookRoom = async () => {
    // Validation of data

    console.log(currentDate);

    // if (dayjs(startDate).format("DD-MM-YYYY") <= currentDate) {
    //   toast.error("Start date must be later than today");
    //   return;
    // }

    if (dayjs(endDate).format("DD-MM-YYYY") < dayjs(startDate).format("DD-MM-YYYY")) {
      toast.error("End date must be later than start date");
      return;
    }

    if (paymentMethod == "") {
      toast.error("Please, select payment method")
    }

    if (roomAvailability.status == "BOOKED") {
      toast.error("Room is already booked");
      return;
    }

    if (paymentMethod == "Cash") {



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
      const res = await postBookRoom(roomId, startDate, endDate, numberOfGuests, paymentMethod, userName);

      if (res.message == "Success") {
        toast.success("Room booking successfully and is in pending status");
        setStartDate("");
        setEndDate("");
        setPaymentMethod("");


        return;
      }
      toast.error("Room booking failed");

    } else if (paymentMethod == "khalti") {

      console.log("khalti payment initial")

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

      try {
        const response = await postRoomKhalti(roomId, startDate, endDate, numberOfGuests, paymentMethod, userName);

        setRes(response);

        console.log("Response from khalti payment:", response.payment_url);
        window.location.href = response.payment_url;

      } catch (error) {
        console.error("Error:", error);
        toast.error("Room booking failed");
      }


    }

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
                  <div className="amenities">
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
            <h1>
              Check-in Date
            </h1>
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
          <label className="label">
            <h1>
              Check-out Date
            </h1>
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              date={endDate}
              onChange={(newDate) => setEndDate(newDate)}
            />
          </LocalizationProvider>
        </div>


        {/* third div */}
        <div className="booking-third-section-custom">

          <div className="third-section-label">
            <h1>
              Select Method of Payment
            </h1>
          </div>

          <div className="third-second-field">
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


          {
            <div className="booked-details">

              <button className="btn btn-primary"
                onClick={bookRoom}
              >
                Book Now
              </button>
            </div>

          }

        </div>

        {/* for fourth section */}
        <div className="booking-third-section">
          <div className="third-section-label">
            <h1>
              Confirmation Details
            </h1>
          </div>
          {

            <div className="booked-details">

              {/* div for user name  */}
              <div className='right-title-holder'>

                <div className="booking-title-holder">

                  User Name:
                </div>

                <div className='dynamic-user-holder'>
                  {userName}
                </div>
              </div>

              {/* div for check in date */}
              <div className="right-title-holder">
                <div className="booking-title-holder">
                  Check-in Date:
                </div>
                <div className="dynamic-user-holder">
                  {dayjs(startDate).format("DD-MM-YYYY")}
                </div>
              </div>


              {/* div for check out date */}
              <div className="right-title-holder">
                <div className="booking-title-holder">
                  Check-out Date:
                </div>
                <div className="dynamic-user-holder">
                  {dayjs(endDate).format("DD-MM-YYYY")}
                </div>
              </div>


              {/* div for total price */}
              <div className="right-title-holder">
                <div className="booking-title-holder">
                  Room Price Per Night:
                </div>
                <div className="dynamic-user-holder">
                  {preOrderPrice}
                </div>
              </div>


              {/* div for payment method */}
              <div className="right-title-holder">
                <div className="booking-title-holder">
                  Payment Method:
                </div>
                <div className="dynamic-user-holder">
                  {paymentMethod}
                </div>
              </div>

            </div>

          }

        </div>


      </div>

    </div >
  );
}