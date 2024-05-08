import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './SpecificBlog.css';
import { getSpecificBlogData } from '../../services/user/GetSpecificBlogAPI';
import { FaGreaterThan } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';


import { getAllBlogData } from '../../services/user/GetAllBlogAPI';
import { getBlogCommentData } from '../../services/user/GetBlogComment';
import { postBlogCommentData } from '../../services/user/PostBlogComment';


function SpecificBlog() {

    const [blogData, setBlogData] = useState({});
    const [otherBlogData, setOtherBlogData] = useState([]);

    const [postComment, setPostComment] = useState('');
    const [blogCommentData, setBlogCommentData] = useState([]);

    const { blogId } = useParams();

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getBlogData = async () => {
        try {
            const response = await getSpecificBlogData(blogId);
            setBlogData(response);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    const getAllOtherBlogData = async () => {
        try {
            const response = await getAllBlogData();
            if (response && Array.isArray(response)) {
                const filteredData = response.filter((blog) => blog.id !== blogId);
                const limitedData = filteredData.slice(0, 3); // Select first 4 blogs
                setOtherBlogData(limitedData);
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };
    

    const getAllBlogCommentData = async () => {
        try {
            const response = await getBlogCommentData(blogId);
            setBlogCommentData(response);
        } catch (error) {
            console.error("Error fetching blog comment data:", error);
        }
    }

    const postCommentData = async () => {

        const jwt = localStorage.getItem('token');

        if (!postComment) {
            toast.error('Please enter a comment');
            return;
        }

        if (!jwt) {
            toast.error('Please login to post a comment');
            return;
        }



        console.log(" post comment ", postComment);
        try {
            await postBlogCommentData(blogId, postComment);
            setPostComment(''); // Reset input field after posting comment
            await getAllBlogCommentData(); // Update comment list after posting comment
            toast.success('Comment posted successfully');
        } catch (error) {
            console.error("Error posting blog comment data:", error);
            // Handle error appropriately, e.g., display error message to user
        }
    };




    useEffect(() => {

        getBlogData();
        getAllOtherBlogData();
        getAllBlogCommentData();

    }, [blogId]);


    return (
        <div className='mt-40'>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                }}
            />
            {/* main div */}
            <div>
                {/* blog image div */}
                <div className='blog-image-holder'>
                    <img className='blog-main-image-holder' src={`http://localhost:8080${blogData.blogImage}`} alt={blogData.title} />
                </div>

                {/* div which will hold two div: left div will contain blog details and right div will contain you might like blogs */}
                <div className='grid-holder'>
                    {/* left div which will contain blog details */}
                    <div>
                        {/* div for holding the title */}
                        <div className='title-holder'>
                            <h1>{blogData.title}</h1>
                        </div>
                        {/* this div will contain blog date, blog tag, blog author */}
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
                                        <FaUserPen /> {blogData.user.userFirstName} {blogData.user.userLastName}
                                    </>
                                )}
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

                        {/* div for comments */}
                        <div className='blog-comment-holder'>
                            <div className='comment-title'>
                                <h2>Comments</h2>
                            </div>

                            {/* div for post comment */}
                            <div className='post-comment-parent-div'>
                                <div className='post-comment-holder'>
                                    <div className='post-comment-title'>
                                        <h1>Post a comment</h1>
                                        <br />
                                    </div>
                                    <div className='post-comment-text'>

                                        <textarea
                                            className='comment-text-area'
                                            placeholder='Write your comment here...'
                                            value={postComment}
                                            onChange={(e) => setPostComment(e.target.value)}
                                        >

                                        </textarea>
                                    </div>
                                    <div className='post-comment-button'>
                                        <button
                                            className='update-profile-button'
                                            onClick={postCommentData}
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {
                                blogCommentData.length === 0 ? (
                                    <div className='hotel-review'>
                                        <h1>No comment have been posted</h1>
                                    </div>
                                
                                ) : (
                                    /* div to display each comment */
                                    blogCommentData.map((comment) => (
                                        <div key={comment.blogCommentId} className='comment'>
                                            <div className='comment-user'>
                                                <div className='user-blog-info'>
                                                    <div className='other-icons'>
                                                        <FaUserPen />
                                                        {comment.userName.userFirstName} {comment.userName.userLastName}
                                                    </div>
                                                    <div className='other-icons'>
                                                        <MdDateRange />
                                                        {comment.createdDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='comment-text-holder'>
                                                <p className='comment-text'>{comment.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                )
                            }




                        </div>

                    </div>


                    {/*right div for other data */}
                    <div className='second-main-blog-div'>
                        <div className='other-blog-title-holder'>
                            <h1>BLOGS YOU MAY LIKE</h1>

                        </div>
                        {/* Map through otherBlogData to render each blog */}
                        {otherBlogData.map((blog) => (
                            <div key={blog.id} className='other-blog-holder'>
                                <Link to={`/specificBlog/${blog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <img src={`http://localhost:8080${blog.blogImage}`} alt={blog.title} className='other-blog-image' />
                                    <div>
                                        <div className='other-blog-title'>
                                            <h3>{blog.title}</h3>
                                        </div>
                                        <div className='other-icons'>
                                            <FaUserPen />
                                            <h3>{blog.user.userFirstName} {blog.user.userLastName}</h3>
                                        </div>
                                        <div className='other-icons'>
                                            <MdDateRange />
                                            <h3>{formatDate(blog.createdDate)}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </div>
    );
}

export default SpecificBlog;
