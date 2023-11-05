import React, { useState, useEffect } from 'react';
import { getAllBlogData } from '../../services/user/GetAllBlogAPI';
import './Blog.css';

function Blog() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const endPoint = "user/view-blog";
        const getBlogData = async () => {
            const response = await getAllBlogData(endPoint);
            setBlogData(response);
        };
        getBlogData();
    }, []);

    return (
        <div className="blogs">
            <div className="blog-grid">
                {blogData.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <img src={blog.blogImage} alt={blog.blogTitle} />
                        {
                            blog.blogImage
                        }
                        <div className="blog-type">
                            <h2>{blog.blogTitle}</h2>
                        </div>
                        <div className="blog-price">
                            <h3>Author: {blog.userId.userName}</h3>
                        </div>
                        <div className="blog-detail">
                            <p>Date: {blog.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;
