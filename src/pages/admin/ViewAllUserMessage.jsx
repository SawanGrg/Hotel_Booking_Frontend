import React, { useEffect, useState } from 'react'
import './ViewAllUserMessage.css'
import GetUserMessage from '../../services/admin/GetUserMessage'

function ViewAllUserMessage() {

    const [userMessages, setUserMessages] = useState([])


    useEffect(() => {
        const getAllUserMessages = async () => {
            const res = await GetUserMessage()
            setUserMessages(res)
        }
        getAllUserMessages()
    }, []);

    return (
        <div>
            <div className='room-header'>
                <h1>View All User Messages</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userMessages.map((message) => (
                            <tr key={message.id}>
                                <td>{message.firstName}</td>
                                <td>{message.lastName}</td>
                                <td>{message.email}</td>
                                <td>{message.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewAllUserMessage