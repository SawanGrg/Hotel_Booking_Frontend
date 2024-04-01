import React,{useEffect, useState} from 'react'
import GetAllUser from '../../services/admin/GetAllUser'
import './ViewAllUser.css'

function ViewAllUser() {

    const [userList, setUserList] = useState([])

    async function fetchUserData(){
        try {
            const userData = await GetAllUser();
            setUserList(userData);
            console.log("all User Data:", userData);
        } catch (error) {
            console.error("Error:", error.message);
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
                        {userList.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userId}</td>
                                <td>{user.userFirstName}</td>
                                <td>{user.userLastName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userPhone}</td>
                                <td>{user.userAddress}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{user.userStatus}</td>
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

export default ViewAllUser;