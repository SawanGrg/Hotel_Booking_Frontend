import React, { useState } from 'react';
import './PostBlog.css';
import PostUserBlog from '../../services/user/PostUserBlog';
import { toast, Toaster } from 'react-hot-toast';

function PostBlog() {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogCategory, setBlogCategory] = useState('TECHNOLOGY'); // Default category
    const [blogImage, setBlogImage] = useState(null);

    async function handlePostBlog(e) {
        e.preventDefault();

        if (blogTitle == ""){
            toast.error('Please enter blog title');
            return;
        }else if (blogTitle.length < 5){
            toast.error('Blog title should be atleast 10 characters');
            return;
        }

        if (blogDescription == ""){
            toast.error('Please enter blog description');
            return;
        }
        else if (blogDescription.length < 50){
            toast.error('Blog description should be atleast 50 characters');
            return;
        }

        if (blogImage == null){
            toast.error('Please select blog image');
            return;
        }

        if (blogCategory == ""){
            toast.error('Please select blog category');
            return;
        }


        try {
            const res = await PostUserBlog(blogTitle, blogDescription, blogCategory, blogImage);
            console.log(res);
            toast.success('Blog posted successfully');
            setBlogTitle('');
            setBlogDescription('');
            setBlogCategory('TECHNOLOGY');
            setBlogImage(null);
            
        } catch (error) {
            console.error('Error posting blog:', error);
            toast.error('Error while posting blog');
        }
    }

    function handleImageChange(e) {
        setBlogImage(e.target.files[0]);
    }

    function handleCategoryChange(e) {
        setBlogCategory(e.target.value);
    }

    return (
        <div className='main-blog-holder'>
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 3000,
                }}
            />
            <div className='post-blog-holder'>
                <h1>Post a Blog</h1>
                <div className='form-group'>
                    <label htmlFor='blogTitle'>Blog Title</label>
                    <br />
                    <input id='blogTitle' type='text' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='blogDescription'>Blog Description</label>
                    <br />
                    <textarea id='blogDescription' value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)} />
                </div>
                {/* Dropdown menu for selecting blog category */}
                <div className='form-group'>
                    <label htmlFor='blogCategory'>Select Blog Tag</label>
                    <select className='blogCategory' value={blogCategory} onChange={handleCategoryChange}>
                        <option value='TECHNOLOGY'>Technology</option>
                        <option value='NATURE'>Nature</option>
                        <option value='CULTURE'>Culture</option>
                        <option value='SCIENCE'>Science</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='blogImage'>Blog Main Image</label>
                    <br />

                    <input id='blogImage' type='file' onChange={handleImageChange} />
                </div>
                <div className='form-group'>
                    <button onClick={handlePostBlog}
                    className='update-profile-button'
                    >Post Blog</button>
                </div>
            </div>
        </div>
    );
}

export default PostBlog;
