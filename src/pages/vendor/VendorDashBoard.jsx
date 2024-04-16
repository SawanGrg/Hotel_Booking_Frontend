import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VendorDashBoard.css";
import GetVendorDashboard from "../../services/vendor/GetVendorDashboard";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdNextWeek } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";

import { Pie } from "react-chartjs-2";
import getVendorHotelReview from "../../services/vendor/GetHotelReview";
import GetVendorRevenueAPI from "../../services/vendor/GetVendorRevenueAPI";

export default function VendorDashBoard() {
  const [userAnalytics, setUserAnalytics] = useState({});
  
  const getVendorDashboard = async () => {
    const response = await GetVendorDashboard();
    setUserAnalytics(response);
  };

  const [vendorRevenue, setVendorRevenue] = useState({});

  const getVendorRevenue = async () => {
    const response = await GetVendorRevenueAPI();
    setVendorRevenue(response);
  };
  
  useEffect(() => {
    getVendorDashboard();
    getVendorRevenue();
  }, []);

  // Prepare data for the pie chart
  const pieChartData = {
    labels: [
      "Total Booked Rooms",
      "Total Available Rooms",
      "Total Pending Rooms",
      "Total Cancelled Rooms",
      "Total Refunded Rooms"
    ],
    datasets: [
      {
        label: "Room Status",
        data: [
          userAnalytics.totalBookedRooms,
          userAnalytics.totalAvailableRooms,
          userAnalytics.totalPendingRooms,
          userAnalytics.totalCancelledRooms,
          userAnalytics.totalRefundedRooms
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF"
        ]
      }
    ]
  };

  const pieChartRevenue = {
    labels : [
      "Total Cash On Arrival Revenue",
      "Total Khalti Revenue",
    ],
    datasets: [
      {
        label: "Revenue Source",
        data: [
          vendorRevenue.cashOnArrival,
          vendorRevenue.khaltiPayment,
        ],
        backgroundColor: [
          "#9966FF",
          "#4BC0C0",
        ]
      }
    ]
  }

  return (
    <div className="vendor-dashboard-parent">
      <div className="vendor-dashboard-holder">
        {/* div for welcome and showing export data */}
        <div className="vendor-first-div-board">
          <div className="vendor-welcome">Welcome to Vendor Dashboard</div>
          <div className="export-data">
            {/* <div className="download-export-data">Export Data</div> */}
            <div className="download-export-data">Download PDF</div>
          </div>
        </div>

        {/* div for showing total number of ratio */}
        <div className="vendor-each-info-div">
          {/* individual displaying data in square format*/}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <RiCalendarCheckLine className="vendor-dashboard-icons" />
              </div>
              <div className="for-full-width">Total Arriving Today</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{userAnalytics.arrivalsToday}</div>

            <div className="each-dashboard-data">
              <div>More info</div>
              <div>
                <FiArrowRightCircle className="vendor-dashboard-icons" />
              </div>
            </div>
          </div>

          {/* individual displaying data in square format*/}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <MdNextWeek className="vendor-dashboard-icons" />
              </div>
              <div>Total Arriving Tomorrow</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">8</div>

            <div className="each-dashboard-data">
              <div>More info</div>
              <div>
                <FiArrowRightCircle className="vendor-dashboard-icons" />
              </div>
            </div>
          </div>

          {/* third individual displaying data in square format */}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <FaMoneyBillTrendUp className="vendor-dashboard-icons" />
              </div>
              <div>Total Revenue Generated</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{userAnalytics.totalRevenue}</div>

            <div className="each-dashboard-data">
              <div>More info</div>
              <div>
                <FiArrowRightCircle className="vendor-dashboard-icons" />
              </div>
            </div>
          </div>

          {/* fourth individual data in sqare format */}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <MdLocalHotel className="vendor-dashboard-icons" />
              </div>
              <div>Total Availalble Room</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{userAnalytics.totalAvailableRooms}</div>

            <div className="each-dashboard-data">
              <div>More info</div>
              <div>
                <FiArrowRightCircle className="vendor-dashboard-icons" />
              </div>
            </div>
          </div>
        </div>

        {/* div for bar graph and pie chart */}
        <div className="vendor-graph">
          {/* Bar graph */}
          <div className="vendor-pie-chart">
            <div className="pie-chart-title">
              Hotel Main Source of Revenue
            </div>
            <div>
              <div className="review-holder">
              <div style={{ width: "700px", height: "500px" }}>
              <Pie
                className="pie-chart"
                data={pieChartRevenue}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom"
                    }
                  },
                  maintainAspectRatio: false,
                  responsive: true
                }}
              />
            </div>
              </div>
            </div>
          </div>

          {/* Pie chart */}
          <div className="vendor-pie-chart">
            <div className="pie-chart-title">
              Room Visual Representation
            </div>
            <div style={{ width: "700px", height: "500px" }}>
              <Pie
                className="pie-chart"
                data={pieChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom"
                    }
                  },
                  maintainAspectRatio: false,
                  responsive: true
                }}
              />
            </div>
          </div>


        </div>


      </div>
    </div>
  );
}