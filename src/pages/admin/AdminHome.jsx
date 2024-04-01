import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import GetGraphData from '../../services/admin/GetGraphData';

import Chart from 'chart.js/auto';


export default function AdminHome() {
  const [graphData, setGraphData] = useState({});

  async function fetchGraphData() {
    try {
      const data = await GetGraphData();
      setGraphData(data);
      console.log("Graph data:", data);
    } catch (error) {
      console.error("Error fetching graph data:", error.message);
    }
  }

  function renderBarGraph() {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
  
    // Check if there's an existing chart instance and destroy it
    if (canvas.chart) {
      canvas.chart.destroy();
    }
  
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Users', 'Vendors', 'Rooms', 'Bookings'],
        datasets: [{
          label: 'Annapurna Analytics',
          data: [graphData.totalUsers, graphData.totalVendors, graphData.totalRooms, graphData.totalBookings],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)', // Red
            'rgba(255, 206, 86, 0.8)', // Yellow
            'rgba(75, 192, 192, 0.8)', // Cyan
            'rgba(153, 102, 255, 0.8)', // Purple
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 22, // Adjust font size
                weight: 'bolder', // Bold font weight
                color: 'rgba(0, 0, 0, 0.0)', // Darker text color
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 22, // Adjust font size
                weight: 'bolder', // Bold font weight
                color: 'rgba(0, 0, 0, 0.0)', // Darker text color
              }
            }
          }
        }
      }
    });
  }
  
  



  useEffect(() => {
    fetchGraphData();
    renderBarGraph();
  }, []);

  return (
    <div>
      <h1> Admin Analytics </h1>
      {/* div for showing the total number */}
      <div className='index-div'>

        <div className='child-content'>
          <div className='child-content-heading'>
            <h2> Total Number of Users </h2>
          </div>
          <div className='child-content-number'>
            <h3> {graphData.totalUsers} </h3>
          </div>
        </div>

        <div className='child-content'>
          <div className='child-content-heading'>
            <h2> Total Number of Vendors </h2>
          </div>
          <div className='child-content-number'>
            <h3> {graphData.totalVendors} </h3>
          </div>
        </div>

        <div className='child-content'>
          <div className='child-content-heading'>
            <h2> Total Number of Rooms </h2>
          </div>
          <div className='child-content-number'>
            <h3> {graphData.totalRooms} </h3>
          </div>
        </div>

        <div className='child-content'>
          <div className='child-content-heading'>
            <h2>Total Number of Booking</h2>
          </div>
          <div className='child-content-number'>
            <h3> {graphData.totalBookings} </h3>
          </div>
        </div>

      </div>

      {/* div for showing in bar graph */}
      <div className='bar-graph'>
        <canvas id="myChart" width="200" height="200"></canvas>
      </div>

    </div>
  );
}
