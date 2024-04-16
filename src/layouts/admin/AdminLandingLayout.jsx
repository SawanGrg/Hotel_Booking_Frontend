import React from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import './AdminLandingLayoutCss.css'
import AdminUpperNavBar from '../../components/admin/AdminUpperNavBar'

function AdminLandingLayout({children}) {
    return (
        <div className='vendor-parent'>
            <div>
                <AdminUpperNavBar />
            </div>
            <div className='main-layout'>

                <div className='vendor-left-layout'>
                    <AdminNavBar />

                </div>
                <div className='right-layout'>
                    {
                        children
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminLandingLayout