import React, { useState, useEffect } from 'react';

function UserBookings( hotelId) {

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {


    const socket = new WebSocket(`ws://localhost:8080/chat/${hotelId}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    setWebSocket(socket);


  }, []);

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
    <div className='pt-40'>
      <h1 className='text-3xl font-bold text-center'>User Bookings</h1>

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

export default UserBookings;
