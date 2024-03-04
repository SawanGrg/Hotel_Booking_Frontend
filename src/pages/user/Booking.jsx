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
import KhaltiCheckout from "khalti-checkout-web";

export default function Booking() {

  const currentDate = dayjs().format("DD-MM-YYYY"); // Get current date
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

    // if (dayjs(startDate).format("DD-MM-YYYY") <= currentDate) {
    //   toast.error("Start date must be later than today");
    //   return;
    // }

    // if (dayjs(endDate).format("DD-MM-YYYY") < dayjs(startDate).format("DD-MM-YYYY")) {
    //   toast.error("End date must be later than start date");
    //   return;
    // }

    if (paymentMethod == "") {
      toast.error("Please, select payment method")
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
      const res = postBookRoom(roomId, startDate, endDate, numberOfGuests, paymentMethod, userName);

      if (res.message != "Success") {
        toast.success("Room booked successfully");
        return;
      }
      toast.error("Room booking failed");
      
    }else if (paymentMethod == "khalti"){

      console.log("khalti payment initial");

      // Khalti checkout configuration
      let config = {
        publicKey: "test_public_key_2159d562967b41798e8bec07a8bbc2b5", // Use live public key
        productIdentity: 12, // Update with your product identity
        productName: "Your Product Name", // Update with your product name
        productUrl: "https://yourproducturl.com", // Update with your product URL
        eventHandler: {
          onSuccess(payload) {
            // hit merchant API for initiating verification
            console.log(payload);
            // Proceed with booking after successful payment
            
            // if (res.message === "Success") {
            //   toast.success("Room booked successfully");
            // } else {
            //   toast.error("Room booking failed");
            // }
          },
          onError(error) {
            // handle errors
            console.log(error);
            toast.error("Payment failed");
          },
          onClose() {
            console.log("Widget is closing");
          }
        },
        paymentPreference: ["KHALTI"]
      };
    
      // Create Khalti checkout instance
      let checkout = new KhaltiCheckout(config);
    
      // Show Khalti checkout on button click
      checkout.show({ amount: 1000});

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

          <div className="third-section-label">
            Select Method of Payment
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

          <div className="third-section-label">
            Confirmation Details
          </div>
          {

            <div className="booked-details">
              <p style={{ marginBottom: '10px' }}>User Name: {userName}</p>
              <p style={{ marginBottom: '10px' }}>Check-in Date: {startDate ? dayjs(startDate).format("DD-MM-YYYY") : null}</p>
              <p style={{ marginBottom: '10px' }}>Check-out Date: {endDate ? dayjs(endDate).format("DD-MM-YYYY") : null}</p>
              <p style={{ marginBottom: '10px' }}>Room Price Per Night: {preOrderPrice}</p>
              <p style={{ marginBottom: '10px' }}>Payment Method: {paymentMethod}</p>
            </div>

          }

        </div>

        {/* for fourth section */}
        <div className="fourth-section-field">
          <div class="business-rule">
            <div className="business-title">
              <strong>Business Rule:</strong>
            </div>
            <div>
              When booking a room from the website, ensure that:
              <ul>
                <li>The selected dates for booking are valid and available.</li>
                <li>The payment process is secure and compliant with industry standards.</li>
                <li>Within first 12 hours of booking, our receptionist will contact you.</li>
              </ul>
            </div>
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


      </div>

    </div >
  );
}