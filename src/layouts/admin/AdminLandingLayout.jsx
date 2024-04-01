import React from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import './AdminLandingLayoutCss.css'

function AdminLandingLayout({children}) {
    return (
        <div className='main-layout'>
            <div className='left-layout'>
                <AdminNavBar />

            </div>
            <div className='right-layout'>
                {
                    children
                }

            </div>
        </div>
    )
}

export default AdminLandingLayout