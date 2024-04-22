import React, { useEffect, useState } from 'react'
import './AdminSpecificBlog.css'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { FaGreaterThan } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import GetSpecificBlog from '../../services/admin/GetSpecificBlog';
import PostVerifyBlog from '../../services/admin/PostVerifyBlog';

function AdminSpecificBlog() {

    const { blogId } = useParams();

    const [blogData, setBlogData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('');

    const getSpecificBlog = async () => {
        try {
            const res = await GetSpecificBlog(blogId);
            setBlogData(res);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const updateBlogStatus = async () => {
        if (!selectedStatus) {
          toast.error('Please select a status');
          return;
        }
        const res = await PostVerifyBlog(blogId, selectedStatus);
        console.log("Response from blog verifying:", res);
        if (res ==  200) {
          toast.success('Blog status updated successfully');
          getSpecificBlog();
        } else {
          toast.error('Error while updating blog status');
        }
      };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        getSpecificBlog();
        console.log("Blog Id:", blogId);
    }, [])

    return (
        <div>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                }}
            />
            {/* main div */}
            <div className='specific-blog-main-holder'>
                <div>
                    {/* div for holding the title */}
                    <div className='title-holder'>
                        <h1>{blogData.title}</h1>
                    </div>
                    {/* this div will contain blog date, blog tag, blog author */}
                    <div className='status-update'>
                        <div className='tag-date-holder'>
                            <div className='specific-tag-holder'>
                                Blog <FaGreaterThan /> {blogData.blogTag}
                            </div>
                            <div className='specific-date-holder'>
                                <MdDateRange />
                                {formatDate(blogData.createdDate)}
                            </div>
                            <div className='specific-author-holder'>
                                {blogData.user && (
                                    <>
                                        <FaUserPen /> {blogData.user.userFirstName} 
                                    </>
                                )}
                            </div>
                            <div>
                                <div className='specific-status-holder'>
                                    Status: {blogData.status}
                                </div>
                            </div>
                        </div>
                        <div className='status'>
                            <div className="status-dropdown">
                                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="VERIFIED">Verifying</option>
                                </select>
                            </div>
                            <div className='admin-verify-button' onClick={updateBlogStatus} >
                                Update
                            </div>
                        </div>
                    </div>
                    {/* this div will contain the blog description */}
                    <div className='specific-description-holder'>
                        {blogData.description && blogData.description.split('\n').map((line, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                {line.trim()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* blog image div */}
                <div className='blog-image-holder'>
                    <img className='blog-image' src={`http://localhost:8080${blogData.blogImage}`} alt={blogData.title} />
                </div>


            </div>
        </div>
    )
}

export default AdminSpecificBlog