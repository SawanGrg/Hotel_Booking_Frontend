import React, { useState, useEffect } from 'react'
import GetVendorIssue from '../../services/admin/GetVendorIssue';

function ViewVendorIssue() {

    const [vendorIssueList, setVendorIssueList] = useState([])

    async function fetchVendorIssueData() {
        try {
            const vendorIssueData = await GetVendorIssue();
            setVendorIssueList(vendorIssueData);
            console.log("all Vendor Issue Data:", vendorIssueData);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    useEffect(() => {
        fetchVendorIssueData();
    }, [])

    return (
        <div>
            <div className='body'> {/* Use the same class 'body' */}
                <div className='room-header'> {/* Use the same class 'room-header' */}
                    <h1>View All Vendor Issues</h1>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Issue Title</th>
                                <th>Issue Description</th>
                                <th>Issuer Hotel Name</th>
                                <th>Issue Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorIssueList.map((vendorIssue, index) => (
                                <tr key={index}>
                                    <td>{vendorIssue.title}</td>
                                    <td>{vendorIssue.description}</td>
                                    <td>{vendorIssue.hotel.hotelName}</td>
                                    <td>{vendorIssue.status}</td>
                                    <td>{new Date(vendorIssue.createdDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>
        </div >
    )
}

export default ViewVendorIssue