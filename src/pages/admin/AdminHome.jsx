import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import GetGraphData from '../../services/admin/GetGraphData';

import Chart from 'chart.js/auto';
import GetAdminRevenue from '../../services/admin/GetAdminRevenue';
import { Pie } from "react-chartjs-2";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdNextWeek } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";

export default function AdminHome() {
  const [graphData, setGraphData] = useState({});
  const [adminRevenue, setAdminRevenue] = useState({});
  const totalRevenue = adminRevenue.cashOnArrival + adminRevenue.khaltiPayment;

  const getGraphData = async () => {
    const res = await GetGraphData();
    setGraphData(res);
  }

  const getAdminRevenue = async () => {
    const res = await GetAdminRevenue();
    setAdminRevenue(res);
  }

  useEffect(() => {
    getGraphData();
    getAdminRevenue();
  }, []);

  const userPieChartData = {
    labels: ['Normal Users', 'Vendors'],
    datasets: [
      {
        data: [graphData.totalUsers, graphData.totalVendors],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  const revenuePieChartData = {
    labels: ['Cash On Arrival', 'Khalti Payment'],
    datasets: [
      {
        data: [adminRevenue.cashOnArrival, adminRevenue.khaltiPayment],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };


  return (
    <div className="vendor-dashboard-parent">
      <div className="vendor-dashboard-holder">
        {/* div for welcome and showing export data */}
        <div className="vendor-first-div-board">
          <div className="vendor-welcome">Welcome to Admin Dashboard</div>
          <div className="export-data">
            {/* <div className="download-export-data">Export Data</div> */}
            {/* <div className="download-export-data">Download PDF</div> */}
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
              <div className="for-full-width">Total Registered User</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{graphData.totalUsers}</div>


          </div>

          {/* individual displaying data in square format*/}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <MdNextWeek className="vendor-dashboard-icons" />
              </div>
              <div>Total Registered Vendor</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{graphData.totalVendors}</div>


           


          </div>

          {/* third individual displaying data in square format */}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <FaMoneyBillTrendUp className="vendor-dashboard-icons" />
              </div>
              <div>Total Revenue Generated</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{totalRevenue}</div>

          </div>

          {/* fourth individual data in sqare format */}
          <div className="each-info-div">
            <div className="dashboard-title">
              <div>
                <MdLocalHotel className="vendor-dashboard-icons" />
              </div>
              <div>Total Booking Till Date</div>
            </div>

            <div className="vendor-dashboard-dynamic-data">{graphData.totalBookings}</div>


          </div>
        </div>

        {/* div for bar graph and pie chart */}
        <div className="vendor-graph">
          <div className="vendor-pie-chart">
            <div className="pie-chart-title">
              Numbers of User Registered in System
            </div>
            <div style={{ width: "700px", height: "500px" }}>
              <Pie
                className="pie-chart"
                data={userPieChartData}
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

          <div className="vendor-pie-chart">
            <div className="pie-chart-title">
              System's Main Source of Revenue
            </div>
            <div style={{ width: "700px", height: "500px" }}>
              <Pie
                className="pie-chart"
                data={revenuePieChartData}
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