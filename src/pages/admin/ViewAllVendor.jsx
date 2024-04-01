import React, { useEffect, useState } from 'react'
import './ViewAllVendor.css'
import GetAllVendor from '../../services/admin/GetAllVendor';

function ViewAllVendor() {

    const [vendorList, setVendorList] = useState([])

    async function fetchVendorData() {
        try {
            const vendorData = await GetAllVendor();
            setVendorList(vendorData);
            console.log("all Vendor Data:", vendorData);
        } catch (error) {
            console.error("Error:", error.message);
        }

    }

    useEffect(() => {
        fetchVendorData();
    }, [])
    
    return (
        <div className='body'> {/* Use the same class 'body' */}
            <div className='room-header'> {/* Use the same class 'room-header' */}
                <h1>View All Vendors</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Date of Birth</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorList.map((vendor, index) => (
                            <tr key={index}>
                                <td>{vendor.userId}</td>
                                <td>{vendor.userFirstName}</td>
                                <td>{vendor.userLastName}</td>
                                <td>{vendor.userEmail}</td>
                                <td>{vendor.userPhone}</td>
                                <td>{vendor.userAddress}</td>
                                <td>{vendor.dateOfBirth}</td>
                                <td>{vendor.userStatus}</td>
                                <td>
                                    <button>Edit</button>
                                    {/* Add onClick handler for delete action */}
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAllVendor;