import React, { useState, useEffect } from 'react';
import { getHotelDetails } from '../../services/vendor/GetHotelDetails';

function VendorChatting() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelData = await getHotelDetails();
        console.log("Hotel Data:", hotelData); // Ensure hotel data is fetched correctly
        setHotelId(hotelData.hotelId); // Assuming hotelId is available in hotelData
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (hotelId) {
      const socket = new WebSocket(`ws://localhost:8080/chat/${hotelId}`);
      
      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const receivedMessage = event.data;
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
      };
      
      setWebSocket(socket);
    }
  }, [hotelId]);

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (webSocket && messageInput.trim() !== '') {
      webSocket.send(messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className=''>
      <h1 className='text-3xl font-bold text-center'>Vendor Chat</h1>

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={messageInput}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default VendorChatting;
