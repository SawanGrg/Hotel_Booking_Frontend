import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VendorDashBoard.css";
import GetVendorDashboard from "../../services/vendor/GetVendorDashboard";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdNextWeek } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function VendorDashBoard() {
  const [userAnalytics, setUserAnalytics] = useState({});

  const getVendorDashboard = async () => {
    const response = await GetVendorDashboard();
    setUserAnalytics(response);
  };

  useEffect(() => {
    getVendorDashboard();
  }, []);

  const data = [
    {
      name: "Total Available Rooms",
      value: userAnalytics.totalAvailableRooms || 0,
    },
    { name: "Total Booked Rooms", value: userAnalytics.totalBookedRooms || 0 },
    {
      name: "Total Cancelled Rooms",
      value: userAnalytics.totalCancelledRooms || 0,
    },
    {
      name: "Total Pending Rooms",
      value: userAnalytics.totalPendingRooms || 0,
    },
    {
      name: "Total Refunded Rooms",
      value: userAnalytics.totalRefundedRooms || 0,
    },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FF00FF", "#800080"];

  return (
    <div className="vendor-dashboard-parent">
      <div className="vendor-dashboard-holder">
        {/* div for welcome and showing export data */}
        <div className="vendor-first-div-board">
          <div className="vendor-welcome">Welcome to Vendor Dashboard</div>
          <div className="export-data">
            <div className="download-export-data">Export Data</div>
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

            <div className="vendor-dashboard-dynamic-data">2</div>

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

            <div className="vendor-dashboard-dynamic-data">8</div>

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
        </div>

        {/* div for bar graph and pie chart */}
        <div>
          line graph and pie chart
          <h2>Pie Chart</h2>
          <div className="vendor-pie-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>


        
      </div>
    </div>
  );
}
