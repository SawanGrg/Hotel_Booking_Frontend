import React from 'react';
import { useParams } from 'react-router-dom';

export default function SpecificHotel() {
    
  const { hotelId } = useParams(); // Accessing the hotelId from the URL params

  return (
    <div className="pt-32"> 
      <h1>Hotel Details for ID: {hotelId}</h1>
      {/* Render hotel details based on the retrieved hotelId */}
    </div>
  );
}
