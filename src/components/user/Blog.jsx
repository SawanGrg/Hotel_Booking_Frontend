import React, { useState, useEffect } from 'react';
import { getAllBlogData } from '../../services/user/GetAllBlogAPI';
import './Blog.css';

import { BiTagAlt } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function Blog() {
    
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await getAllBlogData();
                setBlogData(response); // Assuming response.body contains the array of blog data
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setLoading(false);
            }
        };
        getBlogData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <div className="image-holder">
                <div className='blog-text'>
                    Annapurna Blogs
                </div>
            </div>

            <div className='blog-container'>
                <div className='semi-blog-container'>
                    {blogData.map((blog) => (
                        <Link to={`/specificBlog/${blog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div key={blog.id} className='blog-item'>
                            <div className='content'>
                                {/* Display blog image */}
                                <img src={`http://localhost:8080${blog.blogImage}`} alt={blog.title} className='blog-dynamic-image' />

                                {/* Display blog tags */}
                                <div className='blog-tags'>
                                    <div className='tags'>
                                        <BiTagAlt />
                                    </div>
                                    {blog.blogTag.toUpperCase()}
                                </div>

                                {/* Display blog title */}
                                <div className='blog-title'>
                                    {blog.title.toUpperCase()}
                                </div>

                                {/* Display blog content */}
                                {/* <div className='blog-content'>
                                    {blog.description.length > 30 ? `${blog.description.substring(0, 30)}...` : blog.description}
                                </div> */}

                                {/* Display blog author */}
                                <div className='blog-author'>
                                    <FaUserPen className='author-tags' />
                                    Author: {blog.user.userFirstName} {blog.user.userLastName}
                                </div>

                                {/* Display blog created date */}
                                <div className='blog-date'>
                                    <MdDateRange className='author-tags' />
                                    Date: {formatDate(blog.createdDate)}
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>


            {/* post blog div */}
            <div className='page-holder'>
                <Link to='/postBlog' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='post-blog'>
                        <FaUserEdit className='author-tags' />
                        Post Blog
                    </div>
                    </Link>
            </div>
        </div>
    );
}

export default Blog;
