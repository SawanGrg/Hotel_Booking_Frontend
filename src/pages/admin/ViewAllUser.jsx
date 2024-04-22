import React, { useEffect, useState } from 'react'
import GetAllUser from '../../services/admin/GetAllUser'
import './ViewAllUser.css'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import DeleteUser from '../../services/admin/DeleteUser';
import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";



function ViewAllUser() {

    const [userList, setUserList] = useState([])
    const [filteredData, setFilteredData] = useState([])

    async function fetchUserData() {
        try {
            const userData = await GetAllUser();
            setUserList(userData);
            setFilteredData(userData)
            console.log("all User Data:", userData);
        } catch (error) {
            console.error("Error:", error.message);
        }

    }

    const filteredDataByAvailability = (status) => {
        const filtered = userList.filter(user => {
            // Check if any authority matches the given status
            return user.authorities.some(authority => authority.authority == status);
        });
        setFilteredData(filtered)
    }

    const deleteSpecificUser = async (userId) => {
        const res = await DeleteUser(userId);
        if (res == 200) {
            console.log("done from res 200 before")
            toast.success('User Deleted successfully');
        }
        if (res) {
            toast.success("User Deleted Successfully");
            await fetchUserData();
        }
    }


    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div className='body'> {/* Use the same class 'body' */}
            <div className='room-header'> {/* Use the same class 'room-header' */}
                <h1>View All Users</h1>
            </div>

            {/* filter section */}
            <div className="vendor-booking-filter">
                <div className='vendor-first-filter'>

                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => fetchUserData()}>
                            View All User
                        </div>
                    </div>
                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => filteredDataByAvailability("ROLE_USER")} >
                            View Normal Users
                        </div>
                    </div>
                    <div className='vendor-individual-filter' >
                        <div className='filter-button' onClick={() => filteredDataByAvailability("ROLE_VENDOR")}>
                            View Owners
                        </div>
                    </div>
                </div>

                {/* second filter */}
                <div >
                    <div className='vendor-second-filter'>
                        <input type="text" placeholder="Search User Name"

                            onChange={(e) => {
                                const searchValue = e.target.value;
                                const filteredData = userList.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
                                setFilteredData(filteredData);
                            }}

                        />
                    </div>
                </div>

            </div>



            <div>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
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
                        {filteredData.map((user, index) => (
                            <tr key={index}>
                                
                                <td>{user.username}</td>
                                <td>{user.userFirstName}</td>
                                <td>{user.userLastName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userPhone}</td>
                                <td>{user.userAddress}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{user.userStatus}</td>
                                
                                <td>
                                    <button>
                                        <Link to={`/admin/viewSpecificUser/${user.userId}`}>
                                            <div className='making'>
                                                <div>
                                                    <FaEye className='icons' />
                                                </div>
                                                <div>
                                                    
                                                </div>
                                            </div>
                                        </Link>
                                    </button>
                                    <button
                                            onClick={() => deleteSpecificUser(user.userId)}
                                        >
                                            <div className='making'>
                                                <div>
                                                    <MdDelete className='icons' />
                                                </div>
                                                <div>
                                                    
                                                </div>
                                            </div>

                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAllUser;