import React from 'react';
import './Rooms.css'

export default function Rooms() {
  return (
    <div className="container">
      <div className="room">
        <h1>Hotels</h1>
      </div>
      <div className="rooms">
        <div className="room-grid">
          <img id="room-photo" src="/assets/standard.jpeg" alt="" />
          <div className="room-type">
            <h2>Standard Room</h2>
          </div>
          <div className="room-price">
            <h3>Starting From</h3>
            <h3>NPR 500</h3>
          </div>
          <div className="room-detail">
            <button>
              <h3>Explore More</h3> <img src="/assets/arrow.png" alt="" />
            </button>
          </div>
        </div>
        <div class="room-grid">
          <img id="room-photo" src="/assets/medium.png" alt="" />
          <div class="room-type">
            <h2>Medium Room</h2>
          </div>
          <div class="room-price">
            <h3>Starting From</h3>
            <h3>NPR 1200</h3>
          </div>
          <div class="room-detail">
            <button>
              <h3>Explore More</h3> <img src="/assets/arrow.png" alt="" />
            </button>
          </div>
        </div>
        <div className="room-grid">
          <img id="room-photo" src="/assets/delux.jpg" alt="" />
          <div className="room-type">
            <h2>Delux Room</h2>
          </div>
          <div className="room-price">
            <h3>Starting From</h3>
            <h3>NPR 5000</h3>
          </div>
          <div className="room-detail">
            <button>
              <h3>Explore More</h3> <img src="/assets/arrow.png" alt="" />
            </button>
          </div>
        </div>
        <div className="room-grid">
          <img id="room-photo" src="/assets/medium.png" alt="" />
          <div className="room-type">
            <h2>Medium Room</h2>
          </div>
          <div className="room-price">
            <h3>Starting From</h3>
            <h3>NPR 1200</h3>
          </div>
          <div className="room-detail">
            <button>
              <h3>Explore More</h3> <img src="/assets/arrow.png" alt="" />
            </button>
          </div>
          
        </div>
      </div>

    </div>
  )
}
